import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Inject } from '@angular/core'
import { Plan } from '../../models/plan'
import {
  OrderNumberCreation,
  CreatedOrder,
} from '@interfaces/SettingsInterfaces'
import { SubscriptionService } from '@services/subscription/subscription.service'
import { SafeStyle } from '@angular/platform-browser'
import { BROWSER_STORAGE } from '@app/browserStorage'

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
})
export class PlanCardComponent implements OnInit {
  @Input() planInfo: Plan

  planDetails: OrderNumberCreation
  moreInfo = false
  waitingResponse = false
  // Variable to keep track of the user's selection
  justBasicPlan = false
  productBankPrice: number
  totalPrice: number
  // Checkbox's logic required variables
  selectedCheckbox: number
  // Variable styles. We use the type 'SafeStyle' to avoid style sanitizing.
  planColor: SafeStyle

  constructor(
    private router: Router,
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.planInfo.basicPrice
    this.selectedCheckbox = this.planInfo.id
    this.productBankPrice = this.planInfo.productBank[this.planInfo.id].price

    // Logic for changing the cards colors according to each plan
    switch (this.planInfo.name) {
      case 'basic':
        this.planColor = `#24c8af`
        break

      case 'standard':
        this.planColor = `#ff8647`
        break

      case 'premium':
        this.planColor = `#3673ff`
        break
    }
  }

  // Events that happen in the component -----------------
  showMore(): void {
    this.moreInfo = !this.moreInfo
    this.totalPrice =
      this.planInfo.basicPrice +
      this.planInfo.productBank[this.planInfo.id].price
  }

  updatePrice(checkboxIndex: number, productBankPrice: number): void {
    /* 
      If the checkboxIndex is the same as selectedCheckbox, 
      it means that the checkbox was checked. Since it'll be unchecked, the price is the basic price.
      If no checkbox is selected, the price to show, and the total price is the same as the basic price.
    */
    this.productBankPrice = productBankPrice
    if (this.selectedCheckbox === checkboxIndex) {
      // In case the user checks the same checkbox again, we update the value accordingly.
      if (this.totalPrice === this.planInfo.basicPrice) {
        this.justBasicPlan = false
        this.totalPrice = this.planInfo.basicPrice + productBankPrice
      } else {
        this.justBasicPlan = true
        this.totalPrice = this.planInfo.basicPrice
      }
    } else {
      this.justBasicPlan = false
      this.selectedCheckbox = checkboxIndex
      this.totalPrice = this.planInfo.basicPrice + productBankPrice
    }
  }

  // API calls handler methods-------------------------------
  public getOrderNumber(): void {
    this.planDetails = {
      plan_name: this.planInfo.name,
      type: 'subscription',
      price: this.totalPrice,
      store_id: parseInt(this.localStorage.getItem('storeId')),
    }

    // We start the progress spinner, and the API call.
    this.waitingResponse = true
    this.subscriptionDataService
      .createOrderNumber(this.planDetails)
      .subscribe((serverResponse: CreatedOrder) => {
        // Setting the value on the localStorage, in case the page refresh and the payment process isn't finished yet.
        this.localStorage.setItem(
          'planDetails',
          JSON.stringify(this.planDetails)
        )
        this.localStorage.setItem(
          'createdOrder',
          JSON.stringify(serverResponse)
        )
        this.waitingResponse = false
        window.scrollTo(0, 0)
        this.router.navigate(['/account', 'settings', 'plans', 'plan-details'])
      })
  }
}
