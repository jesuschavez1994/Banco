import { Component, OnInit } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {

  taxPorcentage = 10;
  deliveryCost = 5;

  ordersLists: OrderListOptions[] = [
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel',
        img: './assets/img/avatar.svg',
      },
      orders: [
        {
          name: 'Vegan Food',
          description: '',
          price: 10,
          stock: 10,
          quantity: 5,
          images: [],
          id: 1,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: true,
          deliveryCost: this.deliveryCost,
        },
        {
          name: 'Vegan Food 2',
          description: '',
          price: 10,
          stock: 20,
          quantity: 10,
          images: [],
          id: 2,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: false,
          deliveryCost: this.deliveryCost,
        },
        {
          name: 'Vegan Food 3',
          description: '',
          price: 10,
          stock: 30,
          quantity: 15,
          images: [],
          id: 3,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: false,
          deliveryCost: this.deliveryCost,
        },
      ],
      hasPaid: false,
    },
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel 2',
        img: './assets/img/avatar.svg',
      },
      orders: [
        {
          name: 'Vegan Food 4',
          description: '',
          price: 10,
          stock: 10,
          quantity: 5,
          images: [''],
          id: 1,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: true,
          deliveryCost: this.deliveryCost,
        },
        {
          name: 'Vegan Food 5',
          description: '',
          price: 10,
          stock: 20,
          quantity: 10,
          images: [''],
          id: 2,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: false,
          deliveryCost: this.deliveryCost,
        },
        {
          name: 'Vegan Food 6',
          description: '',
          price: 10,
          stock: 30,
          quantity: 15,
          images: [''],
          id: 3,
          idStore: 1,
          // taxPorcentageByProduct: this.taxPorcentage,
          hasDelivery: false,
          deliveryCost: this.deliveryCost,
        },
      ],
      hasPaid: true
    }
  ];

  ordersListSelected: OrderListOptions;


  tabSelected: 1 | 2 = 1;

  constructor() { }

  ngOnInit(): void {
    this.ordersListSelected = this.ordersLists[0];

  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }

  public selectedOrderList(ordersList: OrderListOptions) {
    this.ordersListSelected = ordersList;
  }


}
