import { Injectable } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Service } from '@services/service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCategorysService extends Service{


  constructor(){}
  
   public getCategoryList(): Observable<Category>{
     
      return this.execQuery<Category>('categories');

   }
}
