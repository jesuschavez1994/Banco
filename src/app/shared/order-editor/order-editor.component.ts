import { Component, Input, OnInit } from '@angular/core';
import { Order } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit{

  hasDelivery = false;

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
      id: 1,
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
      id: 1,
      idStore: 1,
      hasDelivery: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }


  public currentValue($event, inx: number, order: Order) {
    order.quantity = $event;

  }

  public setHasDelivery(value: boolean) {
    this.hasDelivery = value;
  }

  // initInputValue
}
