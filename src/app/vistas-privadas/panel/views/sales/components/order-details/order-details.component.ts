import { Component, OnInit, Input } from '@angular/core';
import { Orders, Datum } from '@services/store-sales/store-sales.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderDetails: Datum;
  @Input() taxPercentage = 19;

  taxAmount: number;
  totalAmount: number;

  constructor() {}

  ngOnInit(): void {
    this.taxAmount = this.totalAmounts('tax');
    this.totalAmount = this.totalAmounts('');
  }

  private totalAmounts(nameValueToGet: string = ''): number {
    let subTotal = 0,
      subTotalDelivery = 0,
      tax = 0,
      total = 0,
      taxTotalByProduct = 0;

    this.orderDetails.order_cart_items.forEach((order) => {
      subTotal += order.price * order.quantity;
      taxTotalByProduct +=
        order.price * order.quantity * (this.taxPercentage / 100);
    });

    subTotal += subTotalDelivery;
    tax = taxTotalByProduct + subTotalDelivery * (this.taxPercentage / 100);
    total = tax + subTotal;

    switch (nameValueToGet) {
      case 'tax':
        return tax;

      case 'delivery':
        return subTotalDelivery;

      default:
        return total;
    }
  }
}
