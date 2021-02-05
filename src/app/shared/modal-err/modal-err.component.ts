import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router} from '@angular/router';

@Component({
  selector: 'app-modal-err',
  templateUrl: './modal-err.component.html',
  styleUrls: ['./modal-err.component.scss']
})
export class ModalErrComponent implements OnInit {

  constructor( private ro : Router,
    public dialogRef: MatDialogRef<ModalErrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }
    onNoClick(): void {
      this.dialogRef.close();
      window.location.reload();
    }
    
  ngOnInit(): void {
  }

}
