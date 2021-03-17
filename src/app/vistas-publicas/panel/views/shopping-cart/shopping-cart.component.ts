import { Component, OnInit } from '@angular/core';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { CurrentPaymentData } from '@interfaces/components-options/shopping-cart.options.interface';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '@app/modals/success/success.component';
import { ConfirmWebpayPlusComponent } from '@app/modals/confirm-webpay-plus/confirm-webpay-plus.component';
import { HomeServiceService } from '../../../services/home-service.service';
import { DeliveryContactOfOrder } from '../../../../models/payment-process';
import { OrderPaymentForm } from '@interfaces/components-options/order.options.interface';
import {
  PaymentDetails,
  PaymentCredentials,
  MallTransactionCredentials,
} from '@interfaces/shopping-cart/shopping-cart.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  userLog: boolean;
  storeLog: boolean | string;
  taxPercentage = 10;
  deliveryCost = 0;

  tabSelected: 1 | 2 | 3 | 4 = 1;
  ordersLists: OrderListOptions[] = [];

  ordersListSelected: OrderListOptions;

  buttonDisabledForm = false;

  termsAndConditions = false;

  currentPaymentData: CurrentPaymentData = {};

  constructor(
    private homeService: HomeServiceService,
    private paymentService: PaymentProcessService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog = this.homeService.storeActive();

    if (this.ordersLists) {
      if (this.ordersLists.length > 0) {
        this.ordersListSelected = this.ordersLists[0];
      }
    }

    this.loadProductsFromCart();
    this.paymentService.getOrders().subscribe((response) => {
      console.log('All order details: ');
      console.log(response);
    });
  }

  public loadProductsFromCart() {
    this.paymentService.getProductsFromCart().subscribe((resp) => {
      let storeNames: any[];
      let productCartOrdered: any[];

      storeNames = [];
      productCartOrdered = [];

      if (resp.data) {
        resp.data.forEach((productFor) => {
          const storeName = productFor.attributes.store.name;

          if (!storeNames.includes(storeName)) {
            storeNames.push(storeName);

            const productOfCart = resp.data.filter((productOfCartFil) => {
              return storeName === productOfCartFil.attributes.store.name;
            });

            const formatProductCart = productOfCart.map((productOfCartMap) => {
              return {
                name: productOfCartMap.name,
                description: 'el back no devuelve la descripción',
                price: productOfCartMap.price,
                stock: productOfCartMap.quantity,
                quantity: productOfCartMap.quantity,
                images: [],
                id: productOfCartMap.id,
                idStore: productOfCartMap.attributes.store.store_id,
                // taxPercentageByProduct: this.taxPercentage,
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
      }
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
    // Si el back actuá de esta manera igual, sería bueno borrar el listado de pedidos al venir al carrito de compras
    // y se carga el carrito de compras, con los productos aún no pagados.
  }

  public filterByTab(tabNumber) {
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
        buttons: ['Cancelar', 'Continuar'],
      },
    });

    modalConfirm.componentInstance.emitSelectData.subscribe((result) => {
      if (result === 'Continuar') {
        modalConfirm.componentInstance.buttonDisabled = true;

        this.paymentService.createOrder().subscribe((orderCreated) => {
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

  public formData(formData: OrderPaymentForm) {
    console.log('formData');
    console.log(formData);

    if (this.currentPaymentData.order) {
      if (Object.keys(this.currentPaymentData.order).length > 0) {
        this.buttonDisabledForm = true;

        const orderId = this.currentPaymentData.order.id;
        const recipientContact = {
          commune_id: formData.comuna,
          direction: formData.direccion,
          house: formData.hospedaje,
          phone: formData.telefono,
          rut: formData.rut,
          address_latitude: formData.latitud,
          address_longitude: formData.longitud,
          name: formData.nombreDireccion,
          // paymentOption: formData.paymentOption,
        };

        // Agregamos los datos del destinatario y su dirección de destino del producto
        this.paymentService
          .addDeliveryContact(orderId, recipientContact)
          .pipe(
            switchMap((paymentDetails: PaymentDetails) => {
              return this.paymentService
                .addPaymentToOrder(paymentDetails.order_id)
                .pipe(
                  switchMap((paymentCredentials: PaymentCredentials) => {
                    return this.paymentService.createTransaction(
                      paymentCredentials.id
                    );
                  })
                );
            })
          )
          .subscribe((mallTransactionResponse: MallTransactionCredentials) => {
            this.dialog.open(ConfirmWebpayPlusComponent, {
              data: {
                title:
                  'Por favor presione el botón en la parte inferior de este mensaje para ser redirigido al sitio web de Transbank y así completar su proceso de pago.',
                mallTransaction: {
                  url: mallTransactionResponse.url,
                  token: mallTransactionResponse.token,
                },
              },
            });
          });
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
