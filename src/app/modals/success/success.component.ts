import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  food: string;
  selectedData: any;
  emitSelectData = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
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

    if (close) {
      this.onClose(this.selectedData);
    }

  }

}
