import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-recover-password',
  templateUrl: './modal-recover-password.component.html',
  styleUrls: ['./modal-recover-password.component.scss']
})
export class ModalRecoverPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalRecoverPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Este campo es requerdio';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
