import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { ProducstResponse } from '@interfaces/product.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service{

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getProductByStore( idStore: number ): Observable<ProducstResponse> {
    return this.execQuery<ProducstResponse>(`stores/${idStore}/products`);
  }

}
