import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})


export class SincronizacionService {

  constructor(public http: HttpClient) { }

  private postQuery<T>(query: string, data: any){

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });

    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data, { headers } );
  }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  private DeleteQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.delete<T>( query );
  }

  // /api/users/2/stores/1/productcsv

  PostListadoProductosExcel(userId: string, storeId: string, file: any){
    const url = `/api/users/${userId}/stores/${storeId}/productcsv`;
    return this.postQuery(url, file);
  }

}
