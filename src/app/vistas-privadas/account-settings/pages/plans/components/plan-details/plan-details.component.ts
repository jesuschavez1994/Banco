import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Plan } from '../../models/plan';
import { MatDialog } from '@angular/material/dialog';
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
        this.orderDetails.order.user_id,
        this.orderDetails.order.id
      )
      .subscribe((serverResponse: Payment) => {
        this.subscriptionDataService
          .createWebpayPayment(serverResponse.order_id)
          .subscribe((paymentCredentials: PaymentCredentials) => {
            this.openDialog(paymentCredentials.url, paymentCredentials.token);
          });
      });
  }

  openDialog(url: string, token: string): void {
    const dialogRef = this.dialog.open(RedirectionModalComponent, {
      disableClose: true,
      data: { url: url, token: token },
    });

    dialogRef.afterClosed().subscribe((transactionDetails) => {
      console.log(
        'The dialog was . And the response from the server was: ',
        transactionDetails
      );
      this.toNextPage(transactionDetails);
    });
  }

  constructor(
    public dialog: MatDialog,
    private subscriptionDataService: SubscriptionService
  ) {
    this.pageChange = new EventEmitter<string>();
    this.voucherDetails = new EventEmitter<object>();
  }

  ngOnInit(): void {}
}
