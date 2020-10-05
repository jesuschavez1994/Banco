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


  GetCategorias(userId: string){
    const url = `/api/admins/${userId}/categories`;
    return this.execQuery(url);
  }

  GetSubcategorias(userId: string, idCategory: number){
    const url = `/api/admins/${userId}/categories/${idCategory}/subcategories`;
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


}
