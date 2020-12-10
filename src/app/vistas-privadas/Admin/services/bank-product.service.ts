import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankProductService {

  constructor(public http: HttpClient) { }


  private postQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data );
  }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  BancoDeProductosFounduss(adminId: string, data: any){
    const url = `/api/admins/${adminId}/banks`;
    return this.postQuery( url, data);
  }

  BancoImagesProducto(adminId: string, idBank: string, data: any){
    const url = `/api/admins/${adminId}/banks/${idBank}/images`;
    return this.postQuery( url, data);
  }

}
