import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends Service {

  constructor(protected http: HttpClient) {
    super(http);
  }

  // ================================= //
  // ********* SERVICIOS POST ******//
  // ================================= //

  SearchProductStore(userId: string, storeId: string, data: any){
    const url = `/api/users/${userId}/stores/${storeId}/products_search`;
    return this.postQuery(url, data);
  }

}
