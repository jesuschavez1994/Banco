import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit{

  @Input() orders: Order[] = [
    {
      name: 'Vegan Food',
      description: '',
      price: 10,
      stock: 10,
      quantity: 5,
      images: [],
      id: 1,
      idStore: 1,
      hasDelivery: true,
    },
    {
      name: 'Vegan Food 2',
      description: '',
      price: 10,
      stock: 20,
      quantity: 10,
      images: [],
      id: 2,
      idStore: 1,
      hasDelivery: false,
    },
    {
      name: 'Vegan Food 3',
      description: '',
      price: 10,
      stock: 30,
      quantity: 15,
      images: [],
      id: 3,
      idStore: 1,
      hasDelivery: false,
    },
  ];

  hasDelivery = false;
  orderSelected: Order[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  public currentValue($event, order: Order) {
    order.quantity = $event;

  }

  public setHasDelivery(value: boolean) {
    this.hasDelivery = value;
    this.orderSelected = [];
  }

  public deleteOrdersSelected(){

    this.orderSelected.forEach( orderSelected => {

      this.orders.forEach((order, index = 0) => {

        if (orderSelected === order) {
          this.orders.splice(index, 1);

        }

      });

    });

    this.orderSelected = [];
  }

  public setHasDeliveryToOrders(hasDelivery: boolean = true){

    this.orderSelected.forEach( orderSelected => {

      this.orders.forEach((order, index = 0) => {

        if (order === orderSelected) {
          this.orders[index].hasDelivery = hasDelivery;

        }

      });

    });

    this.orderSelected = [];

  }

  public selectOrder(order: Order){
    const inxIsOrderSelected = this.orderSelected.findIndex(orders => {
      return orders === order;
    });

    if (inxIsOrderSelected === -1){
      this.orderSelected.push(order);

    }else {
      this.orderSelected.splice(inxIsOrderSelected, 1);

    }

  }

  public selectAllOrder(){

    const ordersFiltered = this.orders.filter( order => {

      return order.hasDelivery === this.hasDelivery;

    });

    if (this.orderSelected.length === ordersFiltered.length){
      this.orderSelected = [];

    } else {

      this.orderSelected = ordersFiltered;

    }

  }

  public isChecked(order: Order){
    const inxOrderSelected = this.orderSelected.findIndex(orderSelected => {
      return orderSelected.id === order.id && orderSelected.idStore === order.idStore;
    });

    return inxOrderSelected > -1;
  }

  public isAllChecked(){

    const ordersFiltered = this.orders.filter( order => {

      return order.hasDelivery === this.hasDelivery;

    });

    return this.orderSelected.length === ordersFiltered.length;
  }

}
