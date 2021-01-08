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
    return this.postQuery<ProductToCartResp>(`cart`, {id: idProduct, qty: quantity});
  }

  public getProductsFromCart(): Observable<ProductToCartResp>{
    return this.execQuery<ProductToCartResp>(`cart`);
  }

  public getCartResume(){
    return this.execQuery(`cart/details`);
  }

  public deleteProsductFromCart(idProduct: number){
    return this.DeleteQuery(`cart/${idProduct}`);
  }

  public emptyCart(){
    return this.DeleteQuery(`cart`);
  }


}
