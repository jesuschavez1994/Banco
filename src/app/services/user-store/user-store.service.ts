import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Negocio } from '../../models/negocio.model';
import { RegistroEmpresa } from '../../models/rut.model';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  Accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  user: Negocio;
  token: string;

  constructor(
    public http: HttpClient,
  ) {
    this.cargarStorage();
   }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  private putQuery<T>(query: string){
    query = URL_SERVICIOS + query;
    return this.http.put<T>( query, httpOptions );
  }



  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('usuario') );

    } else {
      this.token = '';
      this.user = null;

    }

  }

  putDatos(id: string){
    const url = `/api/users/${id}`;
    return this.putQuery(url);
  }

  getStore(){
    const url = '/api/users';
    return this.execQuery(url);
  }

}
