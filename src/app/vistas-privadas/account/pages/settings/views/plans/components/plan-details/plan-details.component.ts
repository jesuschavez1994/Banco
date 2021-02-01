import { Component, OnInit, Inject } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { Plan } from '../../models/plan';
import { MatDialog } from '@angular/material/dialog';
import { BROWSER_STORAGE } from '@app/browserStorage';
import { RedirectionModalComponent } from '../redirection-modal/redirection-modal.component';
import { SubscriptionService } from '@services/subscription/subscription.service';
import {
  CreatedOrder,
  OrderNumberCreation,
  Payment,
  PaymentCredentials,
} from '@interfaces/SettingsInterfaces';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
})
export class PlanDetailsComponent implements OnInit {
  nextPage = 'plans';
  selectedPlanDetails: OrderNumberCreation = JSON.parse(
    this.localStorage.getItem('planDetails')
  );
  webpayDebitCard = false;
  // We use the value on the localStorage as fallback.
  createdOrderDetails = JSON.parse(this.localStorage.getItem('createdOrder'));

  constructor(
    public dialog: MatDialog,
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    this.createdOrderDetails = JSON.parse(
      this.localStorage.getItem('createdOrder')
    );

    this.selectedPlanDetails = JSON.parse(
      this.localStorage.getItem('planDetails')
    );
  }

  // Events that happens in the component -----------------

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
