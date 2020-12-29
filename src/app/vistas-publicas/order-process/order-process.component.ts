import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {


  orders = [
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel',
        img: './assets/img/avatar.svg',
      },
      products: [''],
      hasPaid: false,
      countProduct: 25,
      totalToPay: 235.21,
    },
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel 2',
        img: './assets/img/avatar.svg',
      },
      products: [''],
      hasPaid: true,
      countProduct: 25,
      totalToPay: 235.21,
    }
  ];

  tabSelected: 1 | 2 = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }


}
