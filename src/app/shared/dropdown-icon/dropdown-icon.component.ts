import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Injectable } from '@angular/core';
import { DropdownOption, ClassIcon, ExtraButton, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';
import { Product } from '@interfaces/productCart.interface';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dropdown-icon',
  templateUrl: './dropdown-icon.component.html',
  styleUrls: ['./dropdown-icon.component.scss']
})
export class DropdownIconComponent implements OnInit, AfterViewInit {

  @ViewChild('dropdownCustom') dropdownCustom: ElementRef;
  @ViewChild('inputCheck') inputCheck: ElementRef;

  @Input() classIcon: ClassIcon = {
    class: 'fas fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f00707'
    }
  };
  @Input() displayDropdown = 'left';
  @Input() menuOptions: DropdownOption[] = [];
  @Input() lookMore: DropdownOption;
  // = {
  //   title: 'Ver más',
  //   divider: true,
  //   typeEvent: 'none'
  // };
  @Input() showItemsCounter = true;

  @Output() selected = new EventEmitter<DropdownOption>();
  @Output() extraButton = new EventEmitter<ExtraButtonEmitter>();

  isDropDownExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => {

      const isClickInside = this.dropdownCustom.nativeElement.contains(e.target);

      if (!isClickInside) {
        this.inputCheck.nativeElement.checked = false;
        this.isDropDownExpanded = false;
      }

    });

  }

  public selectOption(option: DropdownOption) {
    this.selected.emit(option);

  }

  public selectExtraButton(extraButton: ExtraButton, option: DropdownOption) {
    this.extraButton.emit(
      {
        extraButton,
        option
      }
    );
  }

  public loadOptionsWithProductsCartResp( products: Product[] ) {
    console.log('loadOptionsWithProductsCartResp');
    console.log(products);

    if (products.length > 0) {

      const menuOptions = [];

      products.forEach( product => {

        let option;

        option = {
          title: product.name,
          typeEvent: 'none',
          eventValue: ['/panel/carrito-compras'],
          data: product
        };

        menuOptions.push(option);

      });

      return menuOptions;
    }
  }


  public toogleDropDown(){
    this.isDropDownExpanded = this.isDropDownExpanded ? false : true;
  }
}
