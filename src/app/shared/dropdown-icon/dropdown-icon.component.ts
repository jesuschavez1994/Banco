import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Injectable,
} from '@angular/core';
import {
  DropdownOption,
  ClassIcon,
  ExtraButton,
  ExtraButtonEmitter,
} from '@interfaces/components-options/dropdown.options.interface';
import { ProductOfCart } from '@interfaces/productCart.interface';
import { Favorite, FavoriteResp } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-dropdown-icon',
  templateUrl: './dropdown-icon.component.html',
  styleUrls: ['./dropdown-icon.component.scss'],
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
      color: '#f00707',
    },
  };
  @Input() displayDropdown = 'left';
  @Input() menuOptions: DropdownOption[] = [];
  @Input() lookMore: DropdownOption;
  @Input() showItemsCounter = true;

  @Output() selected = new EventEmitter<DropdownOption>();
  @Output() extraButton = new EventEmitter<ExtraButtonEmitter>();

  isDropDownExpanded = false;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => {
      const isClickInside = this.dropdownCustom.nativeElement.contains(
        e.target
      );

      if (this.inputCheck) {
        if (!isClickInside) {
          this.inputCheck.nativeElement.checked = false;
          this.isDropDownExpanded = false;
        }
      }
    });
  }

  public selectOption(option: DropdownOption) {
    this.selected.emit(option);
  }

  public selectExtraButton(extraButton: ExtraButton, option: DropdownOption) {
    this.extraButton.emit({
      extraButton,
      option,
    });
  }

  public loadOptionsWithProductsCartResp(products: ProductOfCart[]) {
    const menuOptions = [];

    if (products) {
      if (products.length > 0) {
        products.forEach((product) => {
          let option;

          option = {
            title: product.name,
            typeEvent: 'routerLink',
            eventValue: ['/panel/shopping-cart/cart'],
            data: product,
          };

          menuOptions.push(option);
        });
      }
    }

    return menuOptions;
  }

  public loadOptionsWithFavoriteProductResp(favoritesResp: FavoriteResp) {
    const menuOptions = [];
    const productsFavorites = favoritesResp.favorites;

    if (productsFavorites) {
      if (productsFavorites.length > 0) {
        productsFavorites.forEach((productFa) => {
          let option;

          option = {
            title: productFa.name,
            typeEvent: 'routerLink',
            eventValue: ['/panel/shopping-cart'],
            data: {
              idUser: favoritesResp.id,
              productFavorite: productFa,
            },
          };

          menuOptions.push(option);
        });
      }
    }

    return menuOptions;
  }

  public toggleDropDown() {
    this.isDropDownExpanded = this.isDropDownExpanded ? false : true;
  }
}
