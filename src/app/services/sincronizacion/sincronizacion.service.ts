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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });


    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data, {headers} );
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

  DowloadFileExcelListProduct(userId: string, storeId: string){
    const url = URL_SERVICIOS + `/api/users/${userId}/stores/${storeId}/dowload_productcsv`;
    return this.http.get(url, {responseType: 'blob'});
  }

  GetBankProduct(){
    const url = `/api/banks`;
    return this.execQuery(url);
  }

  GetBankProductSpecific(idBankSync: string){
    const url = `/api/banks/${idBankSync}`;
    return this.execQuery(url);
  }

  SincronizarDesdeBancoPrdoducto(userId: string, storeId: string, data){
    const url = `/api/users/${userId}/stores/${storeId}/sync_create`;
    return this.postQuery(url, data);
  }

  ListProductSincronizadosYNosincronizados(userId: string, storeId: string, page?: any){
    const url = `/api/users/${userId}/stores/${storeId}/products_syncs` + '?page=' + page;
    return this.execQuery(url);
  }


  Sugerir(storeId: string, id: any){
    const url = `/stores/${storeId}/suggests`;
    return this.postQuery(url, id);
  }

  BuscadorSugerencias(termino: any, userId: string, storeId: string){
    const url = `/api/users/${userId}/stores/${storeId}/products_suggested_search`;
    return this.postQuery(url, termino);
  }

  BuscadorBancoDeProductos(termino: any, userId: string, storeId: string){
    const url = `/api/users/${userId}/stores/${storeId}/banks_search`;
    return this.postQuery(url, termino);
  }

  Desincronizar(userId: string, storeId: string, productId: string, idSync: string){
    const url = `/api/users/${userId}/stores/${storeId}/products/${productId}/syncs/${idSync}`;
    return this.DeleteQuery(url);
  }

  public ShowTableExcell(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as XLSX.AOA2SheetOpts;

    return data;
  }


  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'base64' });

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
