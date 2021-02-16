import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BROWSER_STORAGE } from '@app/browserStorage'
import { RedirectionModalComponent } from '../redirection-modal/redirection-modal.component'
import { SubscriptionService } from '@services/subscription/subscription.service'
import {
  OrderNumberCreation,
  Payment,
  PaymentCredentials,
} from '@interfaces/SettingsInterfaces'

import { switchMap, map } from 'rxjs/operators'

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
})
export class PlanDetailsComponent implements OnInit {
  waitingResponse = false
  webpayDebitCard = false
  selectedPlanDetails: OrderNumberCreation = JSON.parse(
    this.localStorage.getItem('planDetails')
  )
  // We use the values on the localStorage as fallback.
  createdOrderDetails = JSON.parse(this.localStorage.getItem('createdOrder'))
  paymentId = parseInt(this.localStorage.getItem('paymentId'))
  paymentCredentials: PaymentCredentials

  constructor(
    public dialog: MatDialog,
    private subscriptionDataService: SubscriptionService,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    this.createdOrderDetails = JSON.parse(
      this.localStorage.getItem('createdOrder')
    )

    this.selectedPlanDetails = JSON.parse(
      this.localStorage.getItem('planDetails')
    )
  }

  // Events that happen in the component -----------------

  // API calls handler methods-------------------------------
  createPayment(): void {
    // We start the spinner.
    this.waitingResponse = true
    this.subscriptionDataService
      .paymentCreation(
        this.createdOrderDetails.order.user_id,
        this.createdOrderDetails.order.id
      )
      .pipe(
        switchMap((paymentDetails: Payment) => {
          // The server will let us know if the API call was done before, and, if it was, the ID of the created payment must be in the localStorage.
          if (paymentDetails.message === 'ya se incio el proceso de pago') {
            return this.subscriptionDataService.createWebpayPayment(
              this.paymentId
            )
          } else {
            // We keep the paymentId in the localStorage in case of error or page refresh.
            this.localStorage.setItem('paymentId', paymentDetails.id.toString())
            return this.subscriptionDataService.createWebpayPayment(
              paymentDetails.id
            )
          }
        })
      )
      .subscribe((paymentCredentials: PaymentCredentials) => {
        console.log(paymentCredentials)
        this.openDialog(paymentCredentials.url, paymentCredentials.token)
      })
  }

  openDialog(url: string, token: string): void {
    const dialogRef = this.dialog.open(RedirectionModalComponent, {
      disableClose: true,
      data: { url: url, token: token },
    })
  }
}
