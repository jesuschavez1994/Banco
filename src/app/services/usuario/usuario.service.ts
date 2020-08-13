import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenName } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  private postQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data, httpOptions );
  }

  constructor(
    public http: HttpClient
  ) {
  }

  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/google';
    return this.http.post(url, { token } ).map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario);
    });
    // return this.postQuery(`/api/login/google`, {token} );
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    return this.postQuery(`/login`, usuario ).map(( resp: any) => {
      // this.guardarStorage( resp.email, resp.remember_token );
      this.guardarStorage( resp.id, resp.token, resp.usuario);
    });
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario );
  }


}
