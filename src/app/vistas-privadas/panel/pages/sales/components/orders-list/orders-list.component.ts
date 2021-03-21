import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datum } from '@interfaces/shopping-cart/shopping-cart.interface';
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
  avatarBackground: string;

  constructor() {}

  ngOnInit(): void {
    this.avatarBackground = `url('${this.orderDetails.user.image[0].src}')`;
  }

  public selectOrder(order: Datum) {
    this.selectedOrder.emit(this.orderDetails);
  }
}
