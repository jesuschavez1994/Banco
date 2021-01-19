import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionService } from '@services/subscription/subscription.service';

import { PaymentCredentials } from '@interfaces/SettingsInterfaces';

@Component({
  selector: 'app-redirection-modal',
  templateUrl: './redirection-modal.component.html',
  styleUrls: ['./redirection-modal.component.css'],
})
export class RedirectionModalComponent implements OnInit {
  dialogData: PaymentCredentials;

  constructor(
    private subscriptionDataService: SubscriptionService,
    private dialogRef: MatDialogRef<RedirectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: PaymentCredentials
  ) {
    // We pass the data to the dialog context.
    this.dialogData = {
      url: data.url,
      token: data.token,
    };
  }

  close() {
    this.dialogRef.close();
  }

  redirectToTransbank(): void {
    this.subscriptionDataService
      .redirectToWebpay(this.dialogData.url, this.dialogData.token)
      .subscribe((transactionDetails: object) => {
        console.log(`Resultado de la transacción: ${transactionDetails}`);
        this.dialogRef.close(transactionDetails);
      });
  }

  ngOnInit(): void {}
}
