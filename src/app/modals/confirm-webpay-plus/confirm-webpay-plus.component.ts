import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-webpay-plus',
  templateUrl: './confirm-webpay-plus.component.html',
  styleUrls: ['./confirm-webpay-plus.component.scss']
})
export class ConfirmWebpayPlusComponent implements OnInit {

  food: string;
  selectedData: any;
  buttonDisabled = false;
  emitSelectData = new EventEmitter();


  constructor(
    public dialogRef: MatDialogRef<ConfirmWebpayPlusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {

    this.emitSelectData.emit(this.selectedData);

    this.dialogRef.close({
      food: this.food
    });
  }


  onClose(specificData?) {
    const data = specificData ? specificData : this.data;
    this.dialogRef.close(data);
  }

  onButton(specificData, close = true) {

    this.selectedData = specificData;

    this.emitSelectData.emit(this.selectedData);

    console.log('onButton');
    console.log(this.data.mallTransaction);

    if (close) {
      this.onClose(this.selectedData);
    }

  }

}
