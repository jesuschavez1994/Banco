import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Plan } from '../../../../models/plan';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  @Output() pageChange: EventEmitter<string>;

  nextPage = 'plans';

  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  constructor() {
    this.pageChange = new EventEmitter<string>();
  }

  ngOnInit(): void {}
}
