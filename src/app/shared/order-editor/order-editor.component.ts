import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Order } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss'],
})
export class OrderEditorComponent implements OnInit, AfterViewInit {
  @Input() orders: Order[] = [];
  @Input() defaulTaxPercent = 19;
  @Output() purchaseAction = new EventEmitter();

  hasDelivery = false;
  orderSelected: Order[] = [];

  acceptTermsAndConditions = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  public currentValue($event, order: Order) {
    order.quantity = $event;
  }

  public setHasDelivery(value: boolean) {
    this.hasDelivery = value;
    this.orderSelected = [];
  }

  public deleteOrdersSelected() {
    this.orderSelected.forEach((orderSelected) => {
      this.orders.forEach((order, index = 0) => {
        if (orderSelected === order) {
          this.orders.splice(index, 1);
        }
      });
    });

    this.orderSelected = [];
  }

  public setHasDeliveryToOrders(hasDelivery: boolean = true) {
    this.orderSelected.forEach((orderSelected) => {
      this.orders.forEach((order, index = 0) => {
        if (order === orderSelected) {
          this.orders[index].hasDelivery = hasDelivery;
        }
      });
    });

    this.orderSelected = [];
  }

  public selectOrder(order: Order) {
    const selectedOrderIndex = this.orderSelected.findIndex((orders) => {
      return orders === order;
    });

    if (selectedOrderIndex === -1) {
      this.orderSelected.push(order);
    } else {
      this.orderSelected.splice(selectedOrderIndex, 1);
    }
  }

  public selectAllOrder() {
    const ordersFiltered = this.orders.filter((order) => {
      return order.hasDelivery === this.hasDelivery;
    });

    console.log('Selected orders');
    console.log(this.orderSelected);

    console.log('Filtered orders');
    console.log(ordersFiltered);

    if (this.orderSelected.length === ordersFiltered.length) {
      this.orderSelected = [];
    } else {
      this.orderSelected = ordersFiltered;
    }
  }

  public isChecked(order: Order) {
    //  const inxOrderSelected = this.orderSelected.findIndex((orderSelected)
    const inxOrderSelected = this.orderSelected.findIndex((orderSelected) => {
      return (
        orderSelected.id === order.id && orderSelected.idStore === order.idStore
      );
      /*       if (
        orderSelected.id === order.id &&
        orderSelected.idStore === order.idStore
      ) {
        return true;
      } */
    });

    return inxOrderSelected > -1;
    //
  }

  public isAllChecked() {
    const ordersFiltered = this.orders.filter((order) => {
      return order.hasDelivery === this.hasDelivery;
    });

    return this.orderSelected.length === ordersFiltered.length;
  }

  public totalsCounts(nameValueToGet: string = '') {
    let subTotal = 0;
    let subTotalDelivery = 0;
    let tax = 0;
    let total = 0;
    let taxTotalByProduct = 0;

    this.orders.forEach((order) => {
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

  public processPayment() {
    console.log('processPayment');
    this.purchaseAction.emit(this.orders);
  }

  public cancelOrder() {
    console.log('cancelOrder');
    this.purchaseAction.emit(this.orders);
  }
}
