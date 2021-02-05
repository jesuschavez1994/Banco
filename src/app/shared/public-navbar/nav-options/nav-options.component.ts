import { Component, OnInit, Input } from '@angular/core';
import {ModalRegisterComponent} from '@shared/modal-register/modal-register.component';
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';
@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {
  @Input() auth: boolean;
  @Input() storeAct: boolean | string;
  constructor(private modal : MatDialog) { }

  // Button DropDown - cart
  classIcon: ClassIcon = {
    class: 'fas fa-shopping-cart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };
  // Button DropDown - favorite
  classIconFavorite: ClassIcon = {
    class: 'far fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };
  @Input() menuOptions: DropdownOption[] = [];
  @Input() menuOptionsFavorite: DropdownOption[] = [];
  ngOnInit(): void {
    this.menuOptionsFavorite.push(
      {
        title: 'name 1',
        typeEvent: 'none',
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.modal.open(ModalRegisterComponent,{width: 'auto',height: 'auto', panelClass: 'custom-modalbox'} );
  }
}
