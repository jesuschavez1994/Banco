import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() isExpanded = false;
  @Input() isListToPaid = false;
  @Input() orderList: OrderListOptions[] = [];

  @Output() selected = new EventEmitter<OrderListOptions>();
  orderSelected: OrderListOptions;

  defaulTaxPercent = 19;
  totalPayment = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.orderList) {
      if (this.orderList.length) {
        this.orderSelected = this.orderList[0];
        this.selected.emit(this.orderSelected);
      }
    }
  }

  public selectOrder(order) {
    this.orderSelected = order;
    this.selected.emit(this.orderSelected);
  }

  public calculateTotalPrice(specificOrder: OrderListOptions): number {
    let subTotal = 0,
      subTotalDelivery = 0,
      tax = 0,
      totalAmount = 0,
      taxTotalByProduct = 0;

    specificOrder.orders.forEach((order) => {
      subTotal += order.price * order.quantity;

      if (order.hasDelivery === true) {
        subTotalDelivery += order.deliveryCost * order.quantity;
      }

      if (order.taxPorcentageByProduct) {
        taxTotalByProduct +=
          order.price * order.quantity * (order.taxPorcentageByProduct / 100);
      } else {
        taxTotalByProduct +=
          order.price * order.quantity * (this.defaulTaxPercent / 100);
      }
    });

    subTotal += subTotalDelivery;
    tax = taxTotalByProduct + subTotalDelivery * (this.defaulTaxPercent / 100);
    totalAmount = subTotal;

    return totalAmount;
  }
}
