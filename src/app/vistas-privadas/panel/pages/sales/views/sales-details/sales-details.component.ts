import { Component, OnInit, Input } from '@angular/core';
import { StoreSalesService } from '@services/store-sales/store-sales.service';
import {
  Orders,
  Datum,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss'],
})
export class SalesDetailsComponent implements OnInit {
  @Input() taxPercentage = 19;

  storeOrders: Datum[];
  selectedOrderDetails: Datum;
  totalAmount: number;
  taxAmount: number;
  loading = true;

  constructor(private _storeSalesService: StoreSalesService) {}

  ngOnInit(): void {
    this._storeSalesService.getStoreOrders().subscribe((allOrders: Orders) => {
      this.storeOrders = allOrders.data;

      this.selectedOrderDetails = this.storeOrders[0];
      this.taxAmount = this.totalAmounts(this.storeOrders[0], 'tax');
      this.totalAmount = this.totalAmounts(this.storeOrders[0], '');
      this.loading = false;
    });
  }

  public getOrderDetails(orderDetails: Datum) {
    this.selectedOrderDetails = orderDetails;
    this.taxAmount = this.totalAmounts(orderDetails, 'tax');
    this.totalAmount = this.totalAmounts(orderDetails, '');
  }

  private totalAmounts(
    selectedOrder: Datum,
    nameValueToGet: string = ''
  ): number {
    let subTotal = 0,
      subTotalDelivery = 0,
      tax = 0,
      total = 0,
      taxTotalByProduct = 0;

    selectedOrder.order_cart_items.forEach((order) => {
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
