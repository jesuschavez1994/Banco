import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Plan } from './models/plan';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { CreatedOrder } from '@interfaces/SettingsInterfaces';
import { BROWSER_STORAGE } from '@app/browserStorage';

import { slider } from '../../routing/route-transitions';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
  animations: [slider],
})
export class PlansComponent implements OnInit {
  selectedPlan: Plan;
  orderInfo: CreatedOrder;
  voucherDetails: object;

  plans: Array<Plan>;
  route = 'Planes';

  constructor(
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {}

  // Router animation handler
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
