import { Component, OnInit, Input } from '@angular/core';
import {
  Orders,
  Datum,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderDetails: Datum;
  @Input() totalAmount: number;
  @Input() taxAmount: number;

  constructor() {}

  ngOnInit(): void {}
}
