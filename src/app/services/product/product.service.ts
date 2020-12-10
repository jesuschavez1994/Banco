import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { ProducstResponse } from '@interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getProductByStore( idStore: number ) {
    return this.execQuery<ProducstResponse>(`stores/${idStore}/products`);
  }

}
