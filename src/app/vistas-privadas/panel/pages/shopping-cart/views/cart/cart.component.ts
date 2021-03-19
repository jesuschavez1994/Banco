import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderListOptions } from '@interfaces/components-options/order.options.interface';
import { CurrentPaymentData } from '@interfaces/components-options/shopping-cart.options.interface';
import { SuccessComponent } from '@app/modals/success/success.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  selectedTab = 1;
  ordersLists: OrderListOptions[] = [];
  ordersListSelected: OrderListOptions;

  deliveryCost = 0;
  currentPaymentData: CurrentPaymentData = {};

  constructor(
    public dialog: MatDialog,
    private paymentService: PaymentProcessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductsFromCart();

    if (this.ordersLists) {
      if (this.ordersLists.length > 0) {
        this.ordersListSelected = this.ordersLists[0];
      }
    }
  }

  private loadProductsFromCart() {
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

  public selectedOrderList(ordersList: OrderListOptions) {
    this.ordersListSelected = ordersList;
  }

  public filterByTab(tabNumber) {
    this.selectedTab = tabNumber;
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
          // Usamos este valor en el localStorage por ahora. En un futuro puede agregarse a una store.
          localStorage.setItem(
            'shoppingCartOrderId',
            this.currentPaymentData.order.id.toString()
          );

          modalConfirm.close();
          modalConfirm.componentInstance.buttonDisabled = false;
          this.router.navigate(['panel', 'shopping-cart', 'payment-process']);
        });
      }
    });
  }
}
