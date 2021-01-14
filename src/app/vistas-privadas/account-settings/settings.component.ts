import { Component, OnInit } from '@angular/core';
import { Plan } from './models/plan';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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
export class SettingsComponent implements OnInit {
  currentPage = 'payment-details';
  selectedPlan: Plan;
  fadeOut = true;
  fadeIn = true;

  plans: Array<Plan>;
  route = 'Planes';

  // Processing the events data from the <app-product-card></app-product-card> component.
  onPlanSelected(plan: Plan): void {
    this.selectedPlan = plan;
  }

  onPageChange(page: string): void {
    this.currentPage = page;
  }

  constructor() {}

  ngOnInit(): void {
    this.plans = [
      new Plan(
        'Basic',
        true,
        false,
        false,
        false,
        14.99,
        'Mensual',
        { amount1: true, amount2: false, amount3: false },
        49.99,
        true
      ),
      new Plan(
        'Standard',
        true,
        true,
        false,
        false,
        24.99,
        'Mensual',
        { amount1: true, amount2: true, amount3: false },
        49.99
      ),
      new Plan(
        'Premium',
        true,
        true,
        true,
        true,
        29.99,
        'Mensual',
        { amount1: true, amount2: true, amount3: true },
        169.99
      ),
    ];

    this.selectedPlan = new Plan(
      'Basic',
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
}
