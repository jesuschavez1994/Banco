import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';
import { Plan } from '../../models/plan';
import { MatDialog } from '@angular/material/dialog';
import { BROWSER_STORAGE } from '@app/browserStorage';
import { RedirectionModalComponent } from '../redirection-modal/redirection-modal.component';
import { SubscriptionService } from '@services/subscription/subscription.service';
import {
  CreatedOrder,
  Payment,
  PaymentCredentials,
} from '@interfaces/SettingsInterfaces';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
})
export class PlanDetailsComponent implements OnInit {
  @Input() selectedPlanDetails: Plan;
  @Input() orderDetails: CreatedOrder;
  @Output() pageChange: EventEmitter<string>;
  @Output() voucherDetails: EventEmitter<object>;

  nextPage = 'plans';
  webpayDebitCard = false;
  // We use the value on the localStorage as fallback.
  createdOrderDetails = JSON.parse(this.localStorage.getItem('createdOrder'));

  constructor(
    public dialog: MatDialog,
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {
    this.pageChange = new EventEmitter<string>();
    this.voucherDetails = new EventEmitter<object>();
  }

  ngOnInit(): void {
    this.createdOrderDetails = JSON.parse(
      this.localStorage.getItem('createdOrder')
    );
  }

  // Events that happens in the component -----------------
  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  toNextPage(voucherDetail: object): void {
    this.nextPage = 'payment-details';
    this.pageChange.emit(this.nextPage);
    this.voucherDetails.emit(voucherDetail);
    window.scrollTo(0, 0);
  }

  // API calls handler methods-------------------------------
  createPayment(): void {
    this.subscriptionDataService
      .paymentCreation(
        this.createdOrderDetails.order.user_id,
        this.createdOrderDetails.order.id
      )
      .subscribe((serverResponse: Payment) => {
        this.subscriptionDataService
          .createWebpayPayment(serverResponse.id)
          .subscribe((paymentCredentials: PaymentCredentials) => {
            this.localStorage.setItem('settingsActualPage', 'payment-details');
            this.openDialog(paymentCredentials.url, paymentCredentials.token);
          });
      });
  }

  openDialog(url: string, token: string): void {
    const dialogRef = this.dialog.open(RedirectionModalComponent, {
      disableClose: true,
      data: { url: url, token: token },
    });
  }
}
