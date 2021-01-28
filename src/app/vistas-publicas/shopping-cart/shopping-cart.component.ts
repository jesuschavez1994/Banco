import { Component, OnInit } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { CurrentPaymentData } from '../../interfaces/components-options/shopping-cart.options.interface';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../../modals/success/success.component';
import { ConfirmWebpayPlusComponent } from '../../modals/confirm-webpay-plus/confirm-webpay-plus.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  taxPorcentage = 10;
  deliveryCost = 0;

  tabSelected: 1 | 2 | 3 | 4 = 1;
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

  buttonDisabledForm = false;

  termsAndConditions = false;

  currentPaymentData: CurrentPaymentData = {};

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

    // Borrar el listado de pedidos y solo borrar el carrito al terminar con el proceso de compra.
    // Considero que si el back, crea un pedido entero de todos los productos
    // Y no un pedido por cada tienda, entonces no debería agregarse a un array de pedidos.
    // sino, ser un y al utilizar el agregar otro pedido, se reescriba, solo permitiendo tener 1 pedido.
    // a la vez.

    // Sino, el back debería permitir en la ruta, colocar el id de la tienda y revisar en el registro de carrito.
    // Para registrar los productos en el carrito que coincidan con el id de tienda, permitiendo así.
    // Crear un pedido por cada tienda.
    // Lo ideal sería tener ambas opciones, pagar todo y pagar solo productos de la tienda.
    // Si el back actua de esta manera igual, sería bueno borrar el listado de pedidos al venir al carrito de compras
    // y se carga el carrito de compras, con los productos aún no pagados.


  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }

  public selectedOrderList(ordersList: OrderListOptions) {
    this.ordersListSelected = ordersList;
  }

  /**
   * @description Muestra un modal de confirmación, si la acción es continuar,
   * entonces se creara un nuevo pedido a procesar el pago
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 27/01/2021
   * @param {*} event
   * @memberof ShoppingCartComponent
   */
  public purchaseAction(event) {

    const modalConfirm = this.dialog.open(SuccessComponent, {
      data: {
        title: '¿Continuar con el proceso de pago?',
        buttons: [
          'Cancelar',
          'Continuar',
        ],
      }
    });

    modalConfirm.componentInstance.emitSelectData.subscribe( result => {

      if (result === 'Continuar') {

        modalConfirm.componentInstance.buttonDisabled = true;

        this.paymentService.createOrder().subscribe( orderCreated => {

          console.log('createOrder');
          console.log(orderCreated);

          this.currentPaymentData.order = orderCreated;

          modalConfirm.close();
          this.tabSelected = 3;

          modalConfirm.componentInstance.buttonDisabled = false;

        });

      }

    });

  }

  public formData(event) {

    if (this.currentPaymentData.order){

      if (Object.keys(this.currentPaymentData.order).length > 0) {

        this.buttonDisabledForm = true;

        this.paymentService.addPaymentToOrder(this.currentPaymentData.order.id).subscribe(

          resp => {
            console.log(resp);

            if (!resp.message) {

              this.currentPaymentData.payment = resp;

              console.log('addPaymentToOrder');
              console.log(this.currentPaymentData);

              this.paymentService.createTransaction(this.currentPaymentData.payment.id).subscribe(
                mallTransactionResp => {

                  console.log('createTransaction');
                  console.log(mallTransactionResp);

                  this.currentPaymentData.mallTransaction = mallTransactionResp;

                  this.tabSelected = 4;

                }
              );

            }

            this.buttonDisabledForm = true;

          }, error => {
            this.buttonDisabledForm = false;
          }
        );

      }

    }

  }

  public backProcessForm(event) {
    if (event === 0) {
      this.tabSelected = 1;
    }
  }

  public showFormToPay() {
    if (this.currentPaymentData) {
      if (this.currentPaymentData) {
        return true;
      }
    }

    return false;
  }

}
