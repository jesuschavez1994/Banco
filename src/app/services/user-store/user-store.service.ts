import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Negocio } from '../../models/negocio.model';
import { RegistroEmpresa } from '../../models/rut.model';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/models/user-store.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DataStore } from '../../models/dataStore.model';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/map';

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

  user: Usuario;
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

  private putQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.put<T>( query, data );
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

  ActualizarUsuarioNegocio(id: string, user: Usuario){
    const url = `/api/users/${id}`;
    return this.putQuery(url, user);
  }

  ActualizarDataStore(userId: string, id: string, data: DataStore){
    const url = `/api/users/${userId}/stores/${id}`;
    return this.putQuery(url, data).subscribe();
  }

  getDataStore(userId: string, id: string){
    const url = `/api/users/${userId}/stores/${id}`;
    return this.execQuery(url);
  }

  getStore(){
    const url = '/api/users';
    return this.execQuery(url);
  }

  getStoreAccountEdit(id: string): Observable<any>{
    const url = `/api/users/${id}/stores`;
    return this.execQuery(url).map( (resp: any) => {
      return resp;
    });
  }

}
