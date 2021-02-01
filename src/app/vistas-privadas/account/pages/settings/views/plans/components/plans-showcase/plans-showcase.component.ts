import { Component, OnInit } from '@angular/core';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plans-showcase',
  templateUrl: './plans-showcase.component.html',
  styleUrls: ['./plans-showcase.component.scss'],
})
export class PlansShowcaseComponent implements OnInit {
  plans: Array<Plan>;
  selectedPlan: Plan;

  constructor() {}

  ngOnInit(): void {
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
}
