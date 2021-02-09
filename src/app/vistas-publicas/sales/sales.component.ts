import { Component, OnInit } from '@angular/core';
import { OrderListOptions } from '../../interfaces/components-options/order.options.interface';
import { PaymentProcessService } from '../../services/payment-process/payment-process.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastComponent } from '../../modals/toast/toast.component';
import {HomeServiceService} from '../services/home-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  userLog: boolean;
  storeLog: boolean | string;
  taxPorcentage = 10;
  deliveryCost = 5;

  tabSelected: 1 | 2 = 1;
  ordersLists: OrderListOptions[] = [
    {
      id: 1,
      group: {
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
      group: {
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



  constructor(private homeService: HomeServiceService,
    private paymentService: PaymentProcessService,
  ) { }

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog= this.homeService.storeActive();
    this.ordersListSelected = this.ordersLists[0];

    console.log('salesComponent');

    this.paymentService.getCartResume().subscribe(resp => {
      console.log('getCartResume');
      console.log(resp);
    });

    console.log('salesComponent///');

  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }

  public selectedOrderList(ordersList: OrderListOptions) {
    this.ordersListSelected = ordersList;
  }

  public purchaseAction(event) {
    console.log(event);
    this.tabSelected = 2;
  }


}
