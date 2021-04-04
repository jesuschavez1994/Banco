import { Component, OnInit } from '@angular/core';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import {
  AllOrders,
  Datums,
  Payment,
} from '@interfaces/shopping-cart/shopping-cart.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnInit {
  lastPage: number;
  orderId = parseInt(localStorage.getItem('shoppingCartOrderId'));
  voucherDetails: Payment;
  loading = true;

  constructor(private _paymentProcessService: PaymentProcessService) {}

  ngOnInit(): void {
    this.loading = true;
    this._paymentProcessService
      .getOrdersDetails(1)
      .pipe(
        switchMap((receivedOrders: AllOrders) => {
          return this._paymentProcessService.getOrdersDetails(
            receivedOrders.last_page
          );
        })
      )
      .subscribe((ordersDetails: AllOrders) => {
        let filteredOrder: Datums[];

        filteredOrder = ordersDetails.data.filter(
          (order) => order.id === this.orderId
        );

        this.voucherDetails = filteredOrder[0].payment;
        this.loading = false;
      });
  }
}
