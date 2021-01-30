import { Component, OnInit, Input } from '@angular/core';
import {ModalRegisterComponent} from '@shared/modal-register/modal-register.component';
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {
  @Input() auth: boolean;
  constructor(private modal : MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.modal.open(ModalRegisterComponent,{width: 'auto',height: 'auto', panelClass: 'custom-modalbox'} );
  }
}
