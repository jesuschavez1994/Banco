import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '@interfaces/product.interface';
import { Product } from '@interfaces/product.interface';
import { FilterProductResp } from '@interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getProductsByStore( idStore: number, page: number = 1, filter?: FilterProductResp ): Observable<ProductsResponse> {

    if (filter){
      return this.postQuery<ProductsResponse>(`stores/${idStore}/products_search?page=${page}`, filter);
    }

    return this.execQuery<ProductsResponse>(`stores/${idStore}/products?page=${page}`);

  }

  public getProductByStore( idStore: number, idProduct: number ): Observable<Product> {
    return this.execQuery<Product>(`stores/${idStore}/products/${idProduct}`);
  }

}
