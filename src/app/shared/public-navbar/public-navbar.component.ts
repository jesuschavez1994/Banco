import { Component, OnInit, Input ,ViewChild} from '@angular/core';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent implements OnInit {
  @Input() userLog: boolean;
  @Input() storeAct: boolean | string;
  
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
    class: 'fas fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };
  @Input() menuOptions: DropdownOption[] = [];
  @Input() menuOptionsFavorite: DropdownOption[] = [];

  constructor( ) { }

  ngOnInit(): void {
    
   
  }
}
