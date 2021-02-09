import { Injectable, OnChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router  } from "@angular/router";
import { Service } from '@services/service.service';
import { Observable } from 'rxjs';
import { CategoriesHome } from "@interfaces/homeProduct.interface";
import { UserPublic } from "@interfaces/userPublic.interface";
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService extends Service{
  // CONSTRUCTOR ********
  constructor( protected http: HttpClient,
    public route: Router ) { 
      super(http);
      console.log('Constructor service');
      this.islog();
    }
    
    idUser: any;
    // atributos
    requestProductsHome: CategoriesHome[]; 
    // metodos
    
    islog(): boolean{
      if(localStorage.getItem('id')){
        this.idUser= localStorage.getItem('id');
        return true;
      }else{
        return false;
      }
    }
    // lista de productos home 
    public obtProducts(): Observable<CategoriesHome[]>{
      console.log('get  list /home/categories');
      return this.execQuery<CategoriesHome[]>('home/categories');
   }
   public obtUserData(id): Observable<UserPublic>{
    
    return this.execQuery<UserPublic>('users/'+id);
 }
  
public logout() {
  const url = 'logout';
  return this.execQuery(url).subscribe( data => {
    this.idUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('storeId');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    this.route.navigate(['/home']);
  });
}

public storeActive() {
  if(typeof(localStorage.getItem('storeId')) == 'string' ){
    return localStorage.getItem('storeId');
  }else{
    return false;
  }
}

}    

 
