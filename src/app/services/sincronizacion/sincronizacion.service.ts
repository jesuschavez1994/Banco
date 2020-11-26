import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import * as XLSX from 'xlsx';

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

  // /api/users/2/stores/1/productcsv

  PostListadoProductosExcel(userId: string, storeId: string, file: any){
    const url = `/api/users/${userId}/stores/${storeId}/productcsv`;
    return this.postQuery(url, file);
  }

  // http://192.168.0.130/founduss/public/api/users/1/stores/1/products/2/syncs

  productSyncrhonized(userId: string, storeId: string, IdProduct: string, post: any){
    const url = `/api/users/${userId}/stores/${storeId}/products/${IdProduct}/syncs`;
    return this.postQuery(url, post);
  }


  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as XLSX.AOA2SheetOpts;

    return data;
  }


  // tslint:disable-next-line: variable-name
  public exportToFile(fileName: string, element_id: string) {
    if (!element_id){
      throw new Error('Element Id does not exists');
    }
    const tbl = document.getElementById(element_id);
    const wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }

}
