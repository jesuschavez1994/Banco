import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input() orders = [];
  orderSelected;

  constructor() { }

  ngOnInit(): void {
    if (this.orders.length) {
      this.orderSelected = this.orders[0];

    }
  }


  public selectOrder(order){
    this.orderSelected = order;
  }

}
