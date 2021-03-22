import { Component, OnInit, Input } from '@angular/core';
import {
  Orders,
  Datum,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.scss'],
})
export class DeliveriesListComponent implements OnInit {
  @Input() orderInfo: Datum;

  itemsCount = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateCartItems(this.orderInfo);
  }

  private calculateCartItems(order: Datum) {
    order.order_cart_items.forEach((item) => {
      this.itemsCount += item.quantity;
    });
  }
}
