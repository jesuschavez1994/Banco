import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Plan } from '../../models/plan';
import {
  OrderNumberCreation,
  CreatedOrder,
} from '@interfaces/SettingsInterfaces';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { BROWSER_STORAGE } from '@app/browserStorage';

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
  waitingResponse = false;
  planDetails: OrderNumberCreation;
  totalPrice = 64.98;

  constructor(
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {
    this.selectPlan = new EventEmitter<Plan>();
    this.pageChange = new EventEmitter<string>();
    this.gotOrderDetails = new EventEmitter<Object>();
  }

  ngOnInit(): void {}

  // Events that happens in the component -----------------
  showMore(): void {
    this.moreInfo = !this.moreInfo;
  }

  onPlanSelected(event): void {
    this.getOrderNumber();
  }

  onCheck(): void {
    console.log(this.productSync);
  }

  // API calls handler methods-------------------------------
  private getOrderNumber(): void {
    this.planDetails = {
      plan_name: this.planInfo.name,
      type: 'subscription',
      price: this.totalPrice,
      store_id: parseInt(this.localStorage.getItem('storeId')),
    };

    // To avoid making the same API call many times, we check if the name or price of the selected plan has changed. If it hasn't, the API call is not made.
    if (
      this.localStorage.getItem('selectedPlanName') !==
        this.planDetails.plan_name ||
      this.localStorage.getItem('selectedPlanPrice') !==
        this.planDetails.price.toString()
    ) {
      // We set the new values.
      this.localStorage.setItem('selectedPlanName', this.planDetails.plan_name);
      this.localStorage.setItem(
        'selectedPlanPrice',
        this.planDetails.price.toString()
      );

      // We start the progress spinner, and the API call.
      this.waitingResponse = true;
      this.subscriptionDataService
        .createOrderNumber(this.planDetails)
        .subscribe((serverResponse: CreatedOrder) => {
          // Setting the value on the localStorage, in case the page refresh and the payment process isn't finished yet.
          this.localStorage.setItem(
            'createdOrderID',
            serverResponse.order.id.toString()
          );
          this.waitingResponse = false;
          this.gotOrderDetails.emit(serverResponse);
          this.selectPlan.emit(this.planInfo);
          this.pageChange.emit(this.nextPage);
          window.scrollTo(0, 0);
        });
    } else {
      this.selectPlan.emit(this.planInfo);
      this.pageChange.emit(this.nextPage);
      window.scrollTo(0, 0);
    }
  }
}
