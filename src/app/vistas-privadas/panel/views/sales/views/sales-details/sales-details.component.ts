import { Component, OnInit } from '@angular/core';
import {
  StoreSalesService,
  Orders,
  Datum,
} from '@services/store-sales/store-sales.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss'],
})
export class SalesDetailsComponent implements OnInit {
  storeOrders: Datum;
  selectedOrderDetails: Orders;
  loading = true;

  constructor(private _storeSalesService: StoreSalesService) {}

  ngOnInit(): void {
    this._storeSalesService.getStoreOrders().subscribe((allOrders: Orders) => {
      console.log('All the store orders');
      console.log(allOrders);
      this.storeOrders = allOrders.data;

      this.selectedOrderDetails = this.storeOrders[0];
      this.loading = false;
    });
  }

  public getOrderDetails(orderDetails: Orders) {
    this.selectedOrderDetails = orderDetails;
  }
}
