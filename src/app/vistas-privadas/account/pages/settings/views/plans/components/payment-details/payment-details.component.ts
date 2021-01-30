import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';
import { BROWSER_STORAGE } from '@app/browserStorage';
import { SubscriptionService } from '@services/subscription/subscription.service';
import { VoucherDetails } from '@interfaces/SettingsInterfaces';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  @Output() pageChange: EventEmitter<string>;

  nextPage = 'plans';
  voucherDetails: VoucherDetails[];

  constructor(
    @Inject(BROWSER_STORAGE) private localStorage: Storage,
    private _subscriptionDataService: SubscriptionService
  ) {
    this.pageChange = new EventEmitter<string>();
  }

  // API calls handler methods-------------------------------
  getVoucherDetails(): void {
    this._subscriptionDataService
      .getVoucherDetails()
      .subscribe((serverResponse: VoucherDetails[]) => {
        this.voucherDetails = serverResponse;
      });
  }

  ngOnInit(): void {
    // Since the order was processed, we clear the value.
    this.localStorage.removeItem('createdOrderDetails');
    this.getVoucherDetails();
  }

  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }
}
