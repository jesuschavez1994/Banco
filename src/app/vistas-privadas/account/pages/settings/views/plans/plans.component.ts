import { Component, OnInit, Inject } from '@angular/core';
import { Plan } from './models/plan';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { CreatedOrder } from '@interfaces/SettingsInterfaces';
import { BROWSER_STORAGE } from '@app/browserStorage';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0, zIndex: 100, position: 'absolute', top: 0 }),
        animate(
          '1s ease-out',
          style({ opacity: 1, zIndex: 100, position: 'absolute', top: 0 })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, zIndex: 100, position: 'absolute', top: 0 }),
        animate(
          '0.5s ease-in',
          style({ opacity: 0, zIndex: 100, position: 'absolute', top: 0 })
        ),
      ]),
    ]),
  ],
})
export class PlansComponent implements OnInit {
  currentPage: string = '';
  selectedPlan: Plan;
  orderInfo: CreatedOrder;
  voucherDetails: object;

  plans: Array<Plan>;
  route = 'Planes';

  constructor(
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    this.currentPage = this.localStorage.getItem('settingsActualPage');
    console.log(this.currentPage);
    this.plans = [
      new Plan(
        'basic',
        true,
        false,
        false,
        false,
        14,
        'Mensual',
        { amount1: true, amount2: false, amount3: false },
        49,
        true
      ),
      new Plan(
        'standard',
        true,
        true,
        false,
        false,
        24,
        'Mensual',
        { amount1: true, amount2: true, amount3: false },
        49
      ),
      new Plan(
        'premium',
        true,
        true,
        true,
        true,
        29,
        'Mensual',
        { amount1: true, amount2: true, amount3: true },
        169
      ),
    ];

    this.selectedPlan = new Plan(
      'basic',
      true,
      false,
      false,
      false,
      14.99,
      'Mensual',
      { amount1: true, amount2: false, amount3: false },
      49.99
    );
  }

  // Processing the events data from the <app-product-card></app-product-card> component.
  onPlanSelected(plan: Plan): void {
    this.selectedPlan = plan;
  }

  gotOrderDetails(orderDetails: CreatedOrder): void {
    this.orderInfo = orderDetails;
  }

  onPageChange(page: string): void {
    this.localStorage.setItem('settingsActualPage', page);
    this.currentPage = page;
  }

  gotVoucherDetails(details: object) {
    this.voucherDetails = details;
  }
}
