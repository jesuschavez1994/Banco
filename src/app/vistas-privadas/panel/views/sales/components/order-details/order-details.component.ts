import { Component, OnInit, Input } from '@angular/core';
import { Orders } from '@services/store-sales/store-sales.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderDetails: Orders;

  constructor() {}

  ngOnInit(): void {}
}
