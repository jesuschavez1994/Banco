import { Injectable, OnChanges } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { ProductCategories } from '@interfaces/productCategories';

import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { Service } from '@services/service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCategorysService extends Service   {
  // request Categories
  public _bxCategory: Category;
  // request Productos
  public _requestCategoryL: ProductCategories;
  //ids de categorias y subcategorias
  public _boxEstateRequestId : number[][]=[null];
  constructor( protected http: HttpClient) { 
    super(http);
    console.log('Constructor service');
  }
  
//Ejecuta la peticion la peticion de la lista de categorias y sub categorias
//Devuelve un Observable
  public getCategoryList(): Observable<Category>{
    console.log('get categories list /categories');
    return this.execQuery<Category>('categories');
 }

 //Obtiene la lista de productos segun los parametros pasados
 //Los parametros ingresados deben ser numeros
 //devuelve un Observable
 public getListProduct(cat: number, subcat: number): Observable<ProductCategories>{
  console.log('Get listProducts');
     
  //categories/idCategoria/subcategories/idSucategoria/product  <- Trae productos por subcategorias
    if(cat != undefined && subcat != undefined){
      console.log( cat , subcat);
      return this.execQuery<ProductCategories>('categories/'+cat+'/subcategories/'+subcat+'/products');
    }
  
    //categories/idCategoria/product  <- Trae productos por categorias
   if(cat != undefined ){
    console.log( cat , subcat);
    return this.execQuery<ProductCategories>('categories/'+cat+'/products');
  }
}
public getListPWPath(query: string): Observable<ProductCategories>{
  console.log('obt productList with path');
  
  return  this.execQuery<ProductCategories>(query);
}
ngOnDestroy(){
  console.log('service get-categorys destroyed');
}
}
