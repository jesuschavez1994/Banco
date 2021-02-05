import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@services/service.service';
import { ProductToCartResp } from '@interfaces/productCart.interface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { Order, PaymentCreated, CreatedMallTransaction } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentProcessService extends Service {

  constructor(
    protected http: HttpClient,
    protected userService: UsuarioService,
  ) {
    super(http);
  }

  private idUser: number;

  private setIdUser() {
    this.idUser = this.userService.getIdUser();

  }

  // Agregamos los productos al carrito
  public addProductToCart(idProduct: number, quantity: number): Observable<ProductToCartResp> {
    console.log('adddProductTocart');
    return this.postQuery<ProductToCartResp>(`cart`, {id: idProduct, qty: quantity});
  }

  // Obtenemos los productos del carrito
  public getProductsFromCart(): Observable<ProductToCartResp>{
    return this.execQuery<ProductToCartResp>(`cart`);
  }

  // Obtenemos los totales (dinero)
  public getCartResume(){
    return this.execQuery(`cart/details`);
  }

  public deleteProductFromCart(idProduct: number): Observable<ProductToCartResp>{
    return this.DeleteQuery<ProductToCartResp>(`cart/${idProduct}`);
  }

  public emptyCart(){
    return this.DeleteQuery(`cart`);
  }

  // EndPoint Buy Orders


  /**
   * @description Registra la lista definitiva de productos próximos a pagar
   * el listado de producto es obtenido de la lista de productos agregados al carrito.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 23/01/2021
   * @param {number} idUser
   * @returns {*}
   * @memberof PaymentProcessService
   */
  public createOrder(): Observable<Order> {
    this.setIdUser();
    return this.postQuery<Order>(`users/${this.idUser}/orders`, {});
  }

  /**
   * @description Se obtiene el pedido a pagar, es importante porque
   * aquí se obtendrá las opciones de pago (payments)
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher@matiz.com.ve
   * @date 24/01/2021
   * @returns {*}
   * @memberof PaymentProcessService
   */
  public getOrders(): Observable<Order> {
    this.setIdUser();
    return this.execQuery<Order>(`users/${this.idUser}/orders`);
  }

  public statusPayment(idProduct: number){
    return this.execQuery(`pago-tienda/${idProduct}/status`);
  }


  /**
   * @description Agrega los datos en el atributo payment de un order, el cual significa que
   * agrega al order el tipo de pago seleccionado, por defecto es WebPayPlus
   *
   * El objetivo es asignar el tipo de pago seleccionado al pedido especifico, para obtener el
   * payment_id para realizar la createTransaction.
   *
   * Las ordenes de compra, tienen el atributo payment,
   * el cual en caso de ser null, significa que aún no selecciona una opción de pago.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 24/01/2021
   * @param {number} idOrder
   * @returns {*}
   * @memberof PaymentProcessService
   */
  public addPaymentToOrder(idOrder: number): Observable<PaymentCreated> {
    this.setIdUser();
    return this.postQuery<PaymentCreated>(`users/${this.idUser}/orders/${idOrder}/payments`, {});
  }

  /**
   * @description Crea la transacción de compra con webPay.
   * retorna el token y url de pago de webPay
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher@matiz.com.ve
   * @date 24/01/2021
   * @param {number} paymentId
   * @returns {*}
   * @memberof PaymentProcessService
   */
  public createTransaction(paymentId: number): Observable<CreatedMallTransaction> {
    this.setIdUser();
    return this.execQuery<CreatedMallTransaction>(`webpayplus/createdMallTransaction?payment_id=${paymentId}&user_id=${this.idUser}`);
  }
  // /

  public getTransactionStatus(token: string): Observable<CreatedMallTransaction> {

    const options = {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    const data = {
      token
    };

    return this.postQuery<CreatedMallTransaction>(`webpayplus/mallTransactionStatus`, data, true, options);
  }

  public getUrlTransaction( url: string, token: string ) {

    const options = {
      headers: {'Content-Type': 'multipart/form-data'}
    };

    const data = {
      token_ws: token,
    };

    return this.postQuery(`${url}`, data, ``, options);
  }

  public mallReturnUrl() {
    return this.execQuery(`webpayplus/mallReturnUrl`);
  }

}
