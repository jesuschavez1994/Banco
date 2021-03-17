import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModalContent {
  title: string;
  mallTransaction: Credentials;
}

interface Credentials {
  url: string;
  token: string;
}

@Component({
  selector: 'app-confirm-webpay-plus',
  templateUrl: './confirm-webpay-plus.component.html',
  styleUrls: ['./confirm-webpay-plus.component.scss'],
})
export class ConfirmWebpayPlusComponent implements OnInit {
  food: string;
  selectedData: any;
  buttonDisabled = false;
  emitSelectData = new EventEmitter();
  dialogData: ModalContent;

  constructor(
    public dialogRef: MatDialogRef<ConfirmWebpayPlusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalContent
  ) {
    // We pass the data to the dialog context.
    this.dialogData = {
      title: data.title,
      mallTransaction: {
        url: data.mallTransaction.url,
        token: data.mallTransaction.token,
      },
    };

    console.log('Dialog data');
    console.log(this.dialogData);
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.emitSelectData.emit(this.selectedData);

    this.dialogRef.close({
      food: this.food,
    });
  }

  onClose(specificData?) {
    const data = specificData ? specificData : this.data;
    this.dialogRef.close(data);
  }
}
