import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Datum } from '@interfaces/shopping-cart/shopping-cart.interface';
import { Image } from '@interfaces/userPublic.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @Input() orderDetails: Datum;
  @Input() activeOrder: Datum;
  @Output() selectedOrder = new EventEmitter<Datum>();

  userImageSrc: Image[];
  avatarBackground: string | SafeStyle;
  orderSelected: Datum;

  constructor(private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.orderDetails.user.image[0].src
      ? (this.avatarBackground = this.sanitization.bypassSecurityTrustStyle(
          `url('https://founduss.cl/${this.orderDetails.user.image[0].src}')`
        ))
      : (this.avatarBackground = `url('assets/img/no-avatar.jpg')`);
  }

  public selectOrder(order) {
    this.orderSelected = this.orderDetails;
    this.selectedOrder.emit(this.orderDetails);
  }
}
