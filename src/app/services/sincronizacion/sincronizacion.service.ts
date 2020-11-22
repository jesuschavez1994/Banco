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
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data );
  }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  private DeleteQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.delete<T>( query );
  }

  PostListadoProductosExcel(userId: string, file: any){
    const url = `/api/admins/${userId}/bankcsv`;
    return this.postQuery(url, file);
  }

}
