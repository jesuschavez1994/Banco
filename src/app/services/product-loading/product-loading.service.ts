import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductLoadingService {

  constructor(public http: HttpClient) { }


  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }


  GetCategorias(){
    const url = `/api/categories`;
    return this.execQuery(url);
  }

  private putQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.put<T>( query, data );
  }

  GetCategoriasBancoProduct(idCategory){
    const url = `/api/categories/${idCategory}`;
    return this.execQuery(url);
  }

  GetSubcategorias(idCategory: number){
    const url = `/api/categories/${idCategory}/subcategories`;
    return this.execQuery(url);
  }

  GetMark(userId: string){
    const url = `/api/admins/${userId}/marks`;
    return this.execQuery(url);
  }

  GetFactories(userId: string){
    const url = `/api/admins/${userId}/factories`;
    return this.execQuery(url);
  }

  GetRecetaMedica(userId: string){
    const url = `/api/admins/${userId}/recipes`;
    return this.execQuery(url);
  }

  EditProduct(userId: string, storeId: string, idProduct: string, data: any){
    const url = `/api/users/${userId}/stores/${storeId}/products/${idProduct}`;
    return this.putQuery(url, data);
  }

  ImagenProductEdit(userId: string, storeId: string, idProduct: string, idImg: string, data: any){
    const url = `/api/users/${userId}/stores/${storeId}/products/${idProduct}/images/${idImg}`;
    return this.putQuery(url, data);
  }


}
