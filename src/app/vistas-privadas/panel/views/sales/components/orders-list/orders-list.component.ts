import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Orders } from '@services/store-sales/store-sales.service';
import { Image } from '@interfaces/userPublic.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @Input() orderDetails: Orders;
  @Output() selectedOrder = new EventEmitter<Orders>();

  userImageSrc: Image[];
  avatarBackground = 'assets/img/no-avatar.jpg';

  constructor() {}

  ngOnInit(): void {}

  public selectOrder(order) {
    // this.orderSelected = order;
    this.selectedOrder.emit(this.orderDetails);
  }
}
