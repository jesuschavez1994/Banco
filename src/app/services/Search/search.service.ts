import { Injectable } from '@angular/core'
import { Service } from '@services/service.service'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class SearchService extends Service {
  constructor(protected http: HttpClient) {
    super(http)
  }

  // ================================= //
  // ********* SERVICIOS POST ******//
  // ================================= //

  SearchProductStore(userId: string, storeId: string, data: any) {
    const url = `users/${userId}/stores/${storeId}/products_search`
    return this.postQuery(url, data)
  }

  globalProductSearch(searchFilters: any, page: number = 1) {
    // We add the corresponding headers to the request
    let httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
      }),
    }
    console.log('Actual page:', page)
    console.log('Filters:', searchFilters)
    const url = `product_search_filters`
    return this.postQuery(url, searchFilters, true, httpOptions)
  }
}
