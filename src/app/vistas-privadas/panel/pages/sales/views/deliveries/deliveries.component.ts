import { Component, OnInit } from '@angular/core';
import { StoreSalesService } from '@services/store-sales/store-sales.service';
import {
  Orders,
  Datum,
} from '@interfaces/shopping-cart/shopping-cart.interface';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
})
export class DeliveriesComponent implements OnInit {
  deliveryOrders: Datum[];
  loadingData = true;

  constructor(private _storeSalesService: StoreSalesService) {}

  ngOnInit(): void {
    this._storeSalesService.getStoreOrders().subscribe((ordersInfo: Orders) => {
      this.deliveryOrders = ordersInfo.data;
      this.loadingData = false;
    });
  }
}
