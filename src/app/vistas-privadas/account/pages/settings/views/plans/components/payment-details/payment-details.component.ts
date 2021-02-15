import { Component, OnInit, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '@app/browserStorage';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { VoucherDetails } from '@interfaces/SettingsInterfaces';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  voucherDetails: VoucherDetails[];
  // We use the value on the localStorage as fallback.
  createdOrderDetails = JSON.parse(this.localStorage.getItem('createdOrder'));

  constructor(
    @Inject(BROWSER_STORAGE) private localStorage: Storage,
    private _subscriptionDataService: SubscriptionService
  ) {}
  ngOnInit(): void {
    // Since the order was processed, we clear the value.

    this.getVoucherDetails();
  }

  // API calls handler methods-------------------------------
  getVoucherDetails(): void {
    this._subscriptionDataService
      .getVoucherDetails(this.createdOrderDetails.order.id)
      .subscribe((serverResponse: VoucherDetails[]) => {
        this.voucherDetails = serverResponse;
      });
  }
}
