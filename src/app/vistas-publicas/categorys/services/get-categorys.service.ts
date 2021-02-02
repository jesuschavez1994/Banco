import { Injectable, OnChanges } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { ProductCategories } from '@interfaces/productCategories';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import { Router  } from "@angular/router";
import { Service } from '@services/service.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCategorysService extends Service   {
  
  // breadCrumb
  //public  breadcr: BreadcrumbOptions[]=[{title: 'home', routerLink:['/']}]; 
  // request Categories
  public _bxCategory: Category;
  // request Productos
  public _requestCategoryL: ProductCategories;
  // ids de categorias y subcategorias
  public _boxEstateRequestId : number[][]=[null];
  
  // CONSTRUCTOR ********
  constructor( protected http: HttpClient,
              public route: Router ) { 
    super(http);
    console.log('Constructor service');
  }
  
// Ejecuta  la peticion de la lista de categorias y sub categorias
// Devuelve un Observable
  public getCategoryList(): Observable<Category>{
    console.log('get categories list /categories');
    return this.execQuery<Category>('categories');
 }

// Requerimentos
// 
//
//
// 
/*  public getDataMenu(): Observable<>{

 } */
 
 
 // Obtiene la lista de productos según los parametros pasados
 // Los parametros ingresados deben ser numeros
 // devuelve un Observable

 public getListProduct(cat: number | string, subcat: number | string): Observable<ProductCategories>{
  console.log('Get listProducts', cat, subcat);
     
  // categories/idCategoria/subcategories/idSucategoria/product  <- Trae productos por subcategorias
    if(cat != undefined && subcat != undefined){
      console.log( cat , subcat);
      return this.execQuery<ProductCategories>('categories/'+cat+'/subcategories/'+subcat+'/products');
    }
  
    // categories/idCategoria/product  <- Trae productos por categorias
   if(cat != undefined ){
    console.log( cat , subcat);
    return this.execQuery<ProductCategories>('categories/'+cat+'/products');
  }
}
// Requerimentos
// 
//
//
//
/* 
public getListProductG(){

}
 */

// get list Product With path
//
//
//

// Esta funcion obtiene una lista de productos segun la ruta
// Usada especificamente en la paginacion de categorias

public getListPWPath(query: string): Observable<ProductCategories>{
  console.log('obt productList with path'+ query);
  
  return  this.execQuery<ProductCategories>(query)
}
/* 
 ***********************************
  Funcion para la generacion de un breadcrumb dinamico
  es decir sin importar la ruta, generaria un grupo de datos
  apto para ser usado en breadCrump Component
  
  -- abandonado
 ***********************************
public generateBreadcrumb():BreadcrumbOptions[]{
  console.log('breadCumbr');
  let breadCrumb:BreadcrumbOptions[]=[{title:"home",routerLink:['/']}];
  // obtener ruta
  // Obtenemos las rutas y sus titulos
  let route= (this.route.url).split('/');
  console.log(route);
  //eliminamos "product"
  route.pop();
  /* route.forEach((item)=>{
    breadCrumb.push({title: item, routerLink: []});
  });   
  // Obtenemos los links de cada titulo
  // recorremos el array principal - Numero de items == Numero de rutas
  for (let i = 1 ; i< route.length; i++){
    // recorremos rutas para generar hijos de padre
   let rtl: string[]=[];
    for(let j = 1 ; j<= i ; j++ ){
      rtl.push(route[j]); 
  }
  breadCrumb.push({title: route[i],routerLink: rtl}); 
  console.log(breadCrumb);
  
  }
  
  console.log(breadCrumb);

  return breadCrumb;
} */

ngOnDestroy(){
  console.log('service get-categorys destroyed');
}
}
