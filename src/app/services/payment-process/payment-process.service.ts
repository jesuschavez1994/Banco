import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@services/service.service';
import { ProductToCartResp } from '@interfaces/productCart.interface';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

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
  public createOrder(){
    this.setIdUser();

    return this.postQuery(`users/${this.idUser}/orders/`, {});
  }

  public getOrders(){
    this.setIdUser();

    return this.execQuery(`users/${this.idUser}/orders/`);
  }

  public statusPayment(idProduct: number){
    return this.execQuery(`pago-tienda/${idProduct}/status`);
  }

  public orderPayments(idOrder: number) {
    this.setIdUser();

    return this.postQuery(`users/${this.idUser}/orders/${idOrder}/payments`, {});
  }

  public createTransaction() {
    return this.execQuery(`webpayplus/createdMallTransaction`);
  }


}
