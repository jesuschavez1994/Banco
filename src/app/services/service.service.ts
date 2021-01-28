import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
const baseUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(protected http: HttpClient){}

  // Read
  protected execQuery<T>(
    query: string,
    url: string | boolean = true
  ){
    query = this.createUrlQuery(query, url);
    return this.http.get<T>( query );
  }

  // Create or Update
  protected postQuery<T>(
    query: string,
    data: any,
    url: string | boolean = true,
    options = {}
  ){
    query = this.createUrlQuery(query, url);
    return this.http.post<T>( query, data, options );
  }

  // Delete
  protected DeleteQuery<T>(
    query: string,
    url: string | boolean = true
  ){
    query = this.createUrlQuery(query, url);
    return this.http.delete<T>( query );
  }

  /**
   * @description Genera/crea el enlace final a ser pasado por parametro
   * al objeto http, al integrar este método correctamente con
   * los métodos http, ofrecemos 2 opciones.
   *
   * 1. Agregar una url base personalizada, para la creación final de la url.
   * 2. Utilizar por defecto la apiUrl environment, para la creación final de la url.
   * 3. Utilizar la url de environment, para la creación final de la url.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 23/01/2021
   * @private
   * @param {string} query
   * @param {(string | boolean)} [url=true]
   * @returns {*}
   * @memberof Service
   */
  private createUrlQuery(
    query: string,
    url: string | boolean = true
  ){

    if ( typeof url === 'boolean' ) {
      url = url ? apiUrl : baseUrl;

    }

    return url + query;

  }


}
