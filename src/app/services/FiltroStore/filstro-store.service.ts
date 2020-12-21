import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilstroStoreService {

  constructor(public http: HttpClient,
    private router: Router) { }

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
  
    private putQuery<T>(query: string, data: any){
      query = URL_SERVICIOS + query;
      return this.http.put<T>( query, data );
    }

    // ***************************************//
    //************* SERVICIOS GET ************//
    // ***************************************//
    GetSubcategoriaStoreFiltro(storeId: string){
      const url = `/api/stores/${storeId}/subcategories`;
      return this.execQuery(url);
    }

    GetCategoriaStoreFiltro(storeId: string){
      const url = `/api/stores/${storeId}/categories`;
      return this.execQuery(url);
    }

    // *********************************//
    //******* END SERVICIOS GET *******//
    // ********************************//


    // ********************************//
    // ********* SERVICIOS POST ******// 
    // ******************************//

    PostProductSearchFiltro(userId: string, storeId: string, data: any){
      const url = `/api/users/${storeId}/stores/${storeId}/products_search`;
      return this.postQuery(url, data);
    }


}
