import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Plan } from '../../models/plan';
import { OrderNumberCreation } from '@interfaces/SettingsInterfaces';
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
  numberOfRetries = 0;
  nextPage = 'payment';
  waitingResponse = false;
  planDetails: OrderNumberCreation;

  showMore(): void {
    this.moreInfo = !this.moreInfo;
  }

  private getOrderNumber(): void {
    this.numberOfRetries++;
    this.planDetails = {
      plan_name: this.planInfo.name,
      type: 'subscription',
      price: 300,
      store_id: 1,
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
        .then((serverResponse) => {
          // Got a reply, stop spinner.
          this.waitingResponse = false;
          console.log(`La respuesta del servidor fue: ${serverResponse}`);
          this.gotOrderDetails.emit(serverResponse);
          this.selectPlan.emit(this.planInfo);
          this.pageChange.emit(this.nextPage);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          this.waitingResponse = false;
        });
    } else {
      this.selectPlan.emit(this.planInfo);
      this.pageChange.emit(this.nextPage);
      window.scrollTo(0, 0);
    }
  }

  onPlanSelected(event): void {
    /*     this.selectPlan.emit(this.planInfo);
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0); */
    this.getOrderNumber();
  }

  onCheck(): void {
    console.log(this.productSync);
  }

  constructor(
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {
    this.selectPlan = new EventEmitter<Plan>();
    this.pageChange = new EventEmitter<string>();
    this.gotOrderDetails = new EventEmitter<Object>();
  }

  ngOnInit(): void {}
}
