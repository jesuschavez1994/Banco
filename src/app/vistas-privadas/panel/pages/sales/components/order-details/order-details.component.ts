import { Component, Input, ViewChild } from '@angular/core';
import {
  Datum,
  OrderCartItem,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  @Input() orderDetails: Datum;
  @Input() totalAmount: number;
  @Input() taxAmount: number;

  selectedTab = 1;

  constructor() {}

  public selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }
}
