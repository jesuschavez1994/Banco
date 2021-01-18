import { Injectable, OnChanges } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { Service } from '@services/service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCategorysService extends Service   {
  public _bxCategory: Category;
  constructor( protected http: HttpClient) { 
    super(http);
  }
 
  public getCategoryG():Category{
    
    this.getCategoryList().subscribe(cat => { this._bxCategory = cat;console.log('promesa hecha' + this._bxCategory)}, err =>{ console.log(err)});
    
    return this._bxCategory;
  }
  public getCategoryList(): Observable<Category>{
    return this.execQuery<Category>('categories');
 }
}
