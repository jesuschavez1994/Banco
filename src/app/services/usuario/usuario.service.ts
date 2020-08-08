import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private postQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data, httpOptions );

  }

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio POST LISTO PARA USAR');
  }

  login(usuario: Usuario, recordar: boolean = false){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = '/login';
    return this.postQuery(`/api/login`, usuario ).map(( resp: any) => {
      localStorage.setItem('email', resp.email);
      localStorage.setItem('token', resp.remember_token);
    });
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario );
  }


}
