import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  url: string;
  token: string;
}

@Component({
  selector: 'app-redirection-modal',
  templateUrl: './redirection-modal.component.html',
  styleUrls: ['./redirection-modal.component.css'],
})
export class RedirectionModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RedirectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
