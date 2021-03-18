import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datum } from '@services/store-sales/store-sales.service';
import { Image } from '@interfaces/userPublic.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @Input() orderDetails: Datum;
  @Output() selectedOrder = new EventEmitter<Datum>();

  userImageSrc: Image[];
  avatarBackground = 'assets/img/no-avatar.jpg';

  constructor() {}

  ngOnInit(): void {}

  public selectOrder(order) {
    // this.orderSelected = order;
    this.selectedOrder.emit(this.orderDetails);
  }
}
