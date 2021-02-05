import { Component, OnInit, Input } from '@angular/core';
import { Router, Navigation } from '@angular/router';
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

  planDetails: OrderNumberCreation;
  moreInfo = false;
  waitingResponse = false;
  // Variable to keep track of the user's selection
  productBank = false;
  productBankPrice: number;
  totalPrice: number;
  // Checkbox's logic required variables
  selectedCheckbox: number;

  constructor(
    private router: Router,
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.planInfo.basicPrice;
    this.selectedCheckbox = this.planInfo.id;
    this.productBankPrice = this.planInfo.productBank[this.planInfo.id].price;
  }

  // Events that happens in the component -----------------
  showMore(): void {
    this.productBank = true;
    this.moreInfo = !this.moreInfo;
    this.totalPrice =
      this.planInfo.basicPrice +
      this.planInfo.productBank[this.planInfo.id].price;
  }

  updatePrice(checkboxIndex: number, productBankPrice: number): void {
    /* 
      If the checkboxIndex is the same as selectedCheckbox, 
      it means that the checkbox was checked. Since it'll be unchecked, the price is the basic price.
      If no checkbox is selected, the price to show, and the total price is the same as the basic price.
    */
    if (this.selectedCheckbox === checkboxIndex) {
      // In case the user checks the same checkbox again, we update the value accordingly.
      if (this.totalPrice === this.planInfo.basicPrice) {
        this.productBank = true;
        this.totalPrice = this.planInfo.basicPrice + productBankPrice;
        this.productBankPrice = productBankPrice;
      } else {
        this.productBank = false;
        this.totalPrice = this.productBankPrice = this.planInfo.basicPrice;
        this.productBankPrice = productBankPrice;
      }
    } else {
      this.productBank = true;
      this.selectedCheckbox = checkboxIndex;
      this.totalPrice = this.planInfo.basicPrice + productBankPrice;
      this.productBankPrice = productBankPrice;
    }
  }

  // API calls handler methods-------------------------------
  public getOrderNumber(): void {
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
            'planDetails',
            JSON.stringify(this.planDetails)
          );
          this.localStorage.setItem(
            'createdOrder',
            JSON.stringify(serverResponse)
          );
          this.waitingResponse = false;
          window.scrollTo(0, 0);
          this.router.navigate([
            '/account',
            'settings',
            'plans',
            'plan-details',
          ]);
        });
    } else {
      window.scrollTo(0, 0);
      this.router.navigate(['/account', 'settings', 'plans', 'plan-details']);
    }
  }
}
