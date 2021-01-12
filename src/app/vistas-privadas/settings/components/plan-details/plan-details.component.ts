import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
})
export class PlanDetailsComponent implements OnInit {
  @Input() selectedPlanDetails: Plan;
  @Output() pageChange: EventEmitter<string>;

  nextPage = 'plans';
  webpayDebitCard = false;

  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  toNextPage(): void {
    this.nextPage = 'payment-details';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  constructor() {
    this.pageChange = new EventEmitter<string>();
  }

  ngOnInit(): void {}
}
