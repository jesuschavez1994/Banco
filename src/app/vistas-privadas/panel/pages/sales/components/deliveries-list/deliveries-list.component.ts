import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import {
  Orders,
  Datum,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.scss'],
})
export class DeliveriesListComponent implements OnInit {
  @Input() orderInfo: Datum;

  itemsCount = 0;
  avatarBackground: string | SafeStyle;

  constructor(private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.calculateCartItems(this.orderInfo);

    this.orderInfo.user.image[0].src
      ? (this.avatarBackground = this.sanitization.bypassSecurityTrustStyle(
          `url('https://founduss.cl/${this.orderInfo.user.image[0].src}')`
        ))
      : (this.avatarBackground = `url('assets/img/no-avatar.jpg')`);
  }

  private calculateCartItems(order: Datum) {
    order.order_cart_items.forEach((item) => {
      this.itemsCount += item.quantity;
    });
  }
}
