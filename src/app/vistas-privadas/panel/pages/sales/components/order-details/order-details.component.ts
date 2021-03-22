import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
} from '@angular/core';
import {
  Datum,
  OrderCartItem,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {
  @Input() orderDetails: Datum;
  @Input() totalAmount: number;
  @Input() taxAmount: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
