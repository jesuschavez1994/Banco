import { Injectable } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { Service } from '@services/service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCategorysService extends Service {

  constructor( protected http: HttpClient) { 
    super(http);
  }
  public getCategoryList(): Observable<Category>{
     
    return this.execQuery<Category>('categories');

 }
}
