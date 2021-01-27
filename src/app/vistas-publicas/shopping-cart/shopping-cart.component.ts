import { Component, OnInit } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { CurrentPaymentData } from '../../interfaces/components-options/shopping-cart.options.interface';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../modals/success/success.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  taxPorcentage = 10;
  deliveryCost = 0;

  tabSelected: 1 | 2 | 3 = 1;
  ordersLists: OrderListOptions[] = [];

  // = [
  //   {
  //     id: 1,
  //     group: {
  //       name: 'farmacia santa isabel',
  //       img: './assets/img/avatar.svg',
  //     },
  //     orders: [
  //       {
  //         name: 'Vegan Food',
  //         description: '',
  //         price: 10,
  //         stock: 10,
  //         quantity: 5,
  //         images: [],
  //         id: 1,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: true,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 2',
  //         description: '',
  //         price: 10,
  //         stock: 20,
  //         quantity: 10,
  //         images: [],
  //         id: 2,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 3',
  //         description: '',
  //         price: 10,
  //         stock: 30,
  //         quantity: 15,
  //         images: [],
  //         id: 3,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //     ],
  //     hasPaid: false,
  //   },
  // ];

  // = [
  //   {
  //     id: 1,
  //     group: {
  //       name: 'farmacia santa isabel',
  //       img: './assets/img/avatar.svg',
  //     },
  //     orders: [
  //       {
  //         name: 'Vegan Food',
  //         description: '',
  //         price: 10,
  //         stock: 10,
  //         quantity: 5,
  //         images: [],
  //         id: 1,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: true,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 2',
  //         description: '',
  //         price: 10,
  //         stock: 20,
  //         quantity: 10,
  //         images: [],
  //         id: 2,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 3',
  //         description: '',
  //         price: 10,
  //         stock: 30,
  //         quantity: 15,
  //         images: [],
  //         id: 3,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //     ],
  //     hasPaid: false,
  //   },
  //   {
  //     id: 1,
  //     group: {
  //       name: 'farmacia santa isabel 2',
  //       img: './assets/img/avatar.svg',
  //     },
  //     orders: [
  //       {
  //         name: 'Vegan Food 4',
  //         description: '',
  //         price: 10,
  //         stock: 10,
  //         quantity: 5,
  //         images: [''],
  //         id: 1,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: true,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 5',
  //         description: '',
  //         price: 10,
  //         stock: 20,
  //         quantity: 10,
  //         images: [''],
  //         id: 2,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //       {
  //         name: 'Vegan Food 6',
  //         description: '',
  //         price: 10,
  //         stock: 30,
  //         quantity: 15,
  //         images: [''],
  //         id: 3,
  //         idStore: 1,
  //         // taxPorcentageByProduct: this.taxPorcentage,
  //         hasDelivery: false,
  //         deliveryCost: this.deliveryCost,
  //       },
  //     ],
  //     hasPaid: true
  //   }
  // ];

  ordersListSelected: OrderListOptions;

  private currentPaymentData: CurrentPaymentData = {};

  constructor(
    private paymentService: PaymentProcessService,
    public dialog: MatDialog
  ){

  }

  ngOnInit(): void {

    if (this.ordersLists) {

      if (this.ordersLists.length > 0) {
        this.ordersListSelected = this.ordersLists[0];
      }

    }

    console.log('ShoppingCartComponent');

    this.paymentService.getProductsFromCart().subscribe(resp => {

      let storeNames: any[];
      let productCartOrdered: any[];

      storeNames = [];
      productCartOrdered = [];

      resp.data.forEach( productFor => {

        const storeName = productFor.attributes.store.name;

        if (!storeNames.includes(storeName)) {

          storeNames.push(storeName);

          const productOfCart = resp.data.filter( productOfCartFil => {
            return storeName === productOfCartFil.attributes.store.name;
          });

          const formatProductCart = productOfCart.map( productOfCartMap => {
            return {
              name: productOfCartMap.name,
              description: 'el back no devuelve la descripción',
              price: productOfCartMap.price,
              stock: productOfCartMap.quantity,
              quantity: productOfCartMap.quantity,
              images: [],
              id: productOfCartMap.id,
              idStore: productOfCartMap.attributes.store.store_id,
              // taxPorcentageByProduct: this.taxPorcentage,
              hasDelivery: false,
              deliveryCost: this.deliveryCost,
            };
          });

          productCartOrdered.push({
            id: productOfCart[0].attributes.store.store_id,
            group: {
              name: storeName,
              img: './assets/img/avatar.svg',
            },
            orders: formatProductCart,
            hasPaid: false,
          });

        }

      });

      this.ordersLists = productCartOrdered;

      console.log('Products of cart loaded');
      console.log(resp);

    });


  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }

  public selectedOrderList(ordersList: OrderListOptions) {
    this.ordersListSelected = ordersList;
  }

  public purchaseAction(event) {

    const modalConfirm = this.dialog.open(SuccessComponent, {
      data: {
        title: 'noooo',
        message: 'mensajeeeee',
        buttons: [
          'Cancelar',
          'Pagar',
        ],
      }
    });

    modalConfirm.componentInstance.emitSelectData.subscribe( result => {
      // console.log('valooooor');
      // console.log(result);

      if (result === 'Pagar') {

        if (!this.currentPaymentData.order) {

          this.paymentService.createOrder().subscribe( orderCreated => {

            console.log('createOrder');
            console.log(orderCreated);

            this.currentPaymentData.order = orderCreated;

            modalConfirm.close();
            this.tabSelected = 3;



          });

        } else {

          if (Object.keys(this.currentPaymentData.order).length === 0) {

            this.paymentService.createOrder().subscribe( orderCreated => {

              console.log('createOrder');
              console.log(orderCreated);

              this.currentPaymentData.order = orderCreated;

              modalConfirm.close();
              this.tabSelected = 3;

            });

          }

        }

      }
    });

  }

  public formData(event) {
    // console.log('formData');
    // console.log(event);
    if (this.currentPaymentData.order){

      if (Object.keys(this.currentPaymentData.order).length === 0) {
        this.paymentService.addPaymentToOrder(this.currentPaymentData.order.id).subscribe(
          resp => {
            this.currentPaymentData.paymentId = resp.id;
          }, error => {

          }
        );
      }

    }

  }

}
