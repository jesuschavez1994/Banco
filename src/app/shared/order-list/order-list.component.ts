import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input() isExpanded = false;
  @Input() isListToPaid = false;
  @Input() orders: OrderListOptions[] = [];

  @Output() selected = new EventEmitter<OrderListOptions>();
  orderSelected: OrderListOptions;

  constructor() { }

  ngOnInit(): void {

    if (this.orders) {

      if (this.orders.length) {
        this.orderSelected = this.orders[0];
        this.selected.emit(this.orderSelected);
      }

    }

  }


  public selectOrder(order){
    this.orderSelected = order;
    this.selected.emit(this.orderSelected);
  }

}
