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

  nextPage = 'plans';
  webpayDebitCard = false;
  // Test
  url: 'Hai, this is the url.';
  token: 'Hai, I am the token!';

  backToPreviousPage(): void {
    this.nextPage = 'plans';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  toNextPage(): void {
    this.nextPage = 'payment-details';
    this.pageChange.emit(this.nextPage);
    window.scrollTo(0, 0);
  }

  createPayment(): void {
    this.subscriptionDataService
      .paymentCreation(
        this.orderDetails.order.user_id,
        this.orderDetails.order.id
      )
      .subscribe((serverResponse: Payment) => {
        console.log(`Response from server: ${serverResponse}`);
        this.subscriptionDataService
          .createWebpayPayment(serverResponse.order_id)
          .subscribe((paymentCredentials: PaymentCredentials) => {
            console.log('Hi');
            this.openDialog(paymentCredentials.url, paymentCredentials.token);
          });
      });
  }

  openDialog(url: string, token: string): void {
    const dialogRef = this.dialog.open(RedirectionModalComponent, {
      disableClose: true,
      data: { url: this.url, token: this.token },
    });

    dialogRef.afterClosed().subscribe((transactionDetails) => {
      console.log('The dialog was closed');
    });
  }

  constructor(
    public dialog: MatDialog,
    private subscriptionDataService: SubscriptionService
  ) {
    this.pageChange = new EventEmitter<string>();
  }

  ngOnInit(): void {}
}
