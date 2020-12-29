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
      isFavorite: false,
    },
    {
      name: 'Vegan Food 2',
      description: '',
      price: 10,
      stock: 10,
      quantity: 8,
      images: [],
      id: 1,
      idStore: 1,
      isFavorite: false,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


  public currentValue($event, inx: number) {
    console.log('currentValue '+inx+': ', $event);
  }

  // initInputValue
}
