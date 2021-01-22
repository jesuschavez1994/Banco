import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@services/service.service';
import { ProductToCartResp } from '@interfaces/productCart.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentProcessService extends Service{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public addProductToCart(idProduct: number, quantity: number): Observable<ProductToCartResp> {
    console.log('adddProductTocart');
    return this.postQuery<ProductToCartResp>(`cart`, {id: idProduct, qty: quantity});
  }

  public getProductsFromCart(): Observable<ProductToCartResp>{
    return this.execQuery<ProductToCartResp>(`cart`);
  }

  public getCartResume(){
    return this.execQuery(`cart/details`);
  }

  public deleteProductFromCart(idProduct: number): Observable<ProductToCartResp>{
    return this.DeleteQuery<ProductToCartResp>(`cart/${idProduct}`);
  }

  public emptyCart(){
    return this.DeleteQuery(`cart`);
  }

  public getOrders(idUser: number){
    return this.execQuery(`users/${idUser}/orders/`);
  }

  public statusPayment(idProduct: number){
    return this.execQuery(`pago-tienda/${idProduct}/status`);
  }

  public orderPayments(idUser: number, idOrder: number){
    return this.postQuery(`users/${idUser}/orders/${idOrder}/payments`, {});
  }

  public createTransaction(){
    return this.execQuery(`webpayplus/createdMallTransaction`);
  }

}
