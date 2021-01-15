import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plan } from '../../models/plan';
import { SubscriptionService } from '@services/subscription/subscription.service';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
})
export class PlanCardComponent implements OnInit {
  @Input() planInfo: Plan;
  @Output() private selectPlan: EventEmitter<Plan>;
  @Output() private gotOrderDetails: EventEmitter<Object>;
  @Output() private pageChange: EventEmitter<string>;

  moreInfo = false;
  productSync = '100';
  nextPage = 'payment';
  planDetails = {};

  showMore(): void {
    this.moreInfo = !this.moreInfo;
  }

  private getOrderNumber(): void {
    this.subscriptionDataService
      .createOrderNumber(this.planDetails)
      .then((serverResponse) => {
        console.log(`La respuesta del servidor fue: ${serverResponse}`);
        this.pageChange.emit(this.nextPage);
        window.scrollTo(0, 0);
      });
  }

  onPlanSelected(event): void {
    this.selectPlan.emit(this.planInfo);
    this.getOrderNumber();
  }

  onCheck(): void {
    console.log(this.productSync);
  }

  constructor(private subscriptionDataService: SubscriptionService) {
    this.selectPlan = new EventEmitter<Plan>();
    this.pageChange = new EventEmitter<string>();
    this.gotOrderDetails = new EventEmitter<Object>();
  }

  ngOnInit(): void {
    this.planDetails = {
      plan_name: this.planInfo.name,
      type: 'subscription',
      price: 300,
      store_id: 1,
    };
  }
}
