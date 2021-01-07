import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '@services/service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentProcessService extends Service{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public addProductToCart(idProduct: number, quantity: number) {
    return this.postQuery(`cart`, {id: idProduct, qty: quantity});
  }

  public getProductsFromCart(){
    return this.execQuery(`cart`);
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
