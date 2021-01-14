import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
})
export class PlanCardComponent implements OnInit {
  @Input() planInfo: Plan;
  @Output() private selectPlan: EventEmitter<Plan>;
  @Output() private pageChange: EventEmitter<string>;

  moreInfo = false;
  productSync = '100';
  nextPage = 'payment';

  public showMore(): void {
    this.moreInfo = !this.moreInfo;
  }

  onPlanSelected(event): void {
    this.selectPlan.emit(this.planInfo);
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  onCheck(): void {
    console.log(this.productSync);
  }

  constructor() {
    this.selectPlan = new EventEmitter<Plan>();
    this.pageChange = new EventEmitter<string>();
  }

  ngOnInit(): void {}
}
