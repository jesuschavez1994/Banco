import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { ProductCategories } from '@interfaces/productCategories';
import { Service } from '@services/service.service';
import { Router } from '@angular/router';
import { GetCategorysService } from '.././services/get-categorys.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrComponent} from '@shared/modal-err/modal-err.component'
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  // **** Input **** //
 
  constructor(  private service: Service,
                private getCategorys: GetCategorysService,
                private router: Router,
                public spinner: NgxSpinnerService,
                private modal : MatDialog,
                ) {
      console.log('Constructor list product');
      /* Obtiene el ultimo valor que envio el menu */
      if(this.getCategorys._boxEstateRequestId[0]!= undefined){
        console.log('anterior request products ',this.getCategorys._boxEstateRequestId[0]);
        this.idsProduct= this.getCategorys._boxEstateRequestId[0];
      }

      console.log('setting list product', this.getCategorys._requestCategoryL);
     
    if(this.getCategorys._requestCategoryL == undefined){
      console.log('pidiendo productos', this.idsProduct , this.listaProductos , this.getCategorys._requestCategoryL);
      this.obtProduct();
     }else{
      this.listaProductos = this.getCategorys._requestCategoryL;
     }
     }
     
     //peticion paginacion
    peticionesPP: ProductCategories[];
    //peticion lista de Productos
    listaProductos: ProductCategories;
    //Identificador Ids subcat y cat
    idsProduct: number[];
    //Array que contendra rutas de items paginacion
    pgOptions: number[]=[];
    //respuesta .data empty
    empty: boolean=false;
    //titulo de categoria de seleccion
    titleCat: string;
    //titulo de subcategoria de seleccion
    titleSubcat: string;
  
  ngOnChanges(){

    console.log('on changes list product', this.getCategorys._requestCategoryL);
     /* 
    if(this.getCategorys._requestCategoryL == undefined){
      this.obtProduct();
     }else{
      this.listaProductos = this.getCategorys._requestCategoryL;
     } */
  }
  ngOnInit(): void {
    console.log('show spinner');
    this.spinner.show(); 

    console.log('on init list product', this.getCategorys._requestCategoryL);
    
      if(this.getCategorys._requestCategoryL == undefined){
        
        this.obtProduct();
      }
  }
 
ngOndestroy(){

  console.log('on destroy list product');
  //guardar la ultima respuesta obtenida
  if(this.listaProductos!= undefined){
  this.getCategorys._requestCategoryL =this.listaProductos;
  console.log(this.listaProductos);
  console.log(this.getCategorys._bxCategory);
  
}

}
  //Obtiene listado de productos
  obtProduct(){

    this.spinner.show(); 

    //Si no existe referencia de productos
    //redireccion a categorys
    if(this.idsProduct == undefined){
      console.log('redireccion', this.idsProduct);
      this.router.navigate(['categorys']);
    }else{
    //obtencion de data primera mano
    //tarea asincronica
    console.log('pidiendo lista prooductos');
    
    this.getCategorys.getListProduct(this.idsProduct[0], this.idsProduct[1]).subscribe( 
         requestD => {
          console.log('productos recividos', requestD);
          this.listaProductos = requestD;
           //si no hay productos en categoria
           //aviso de "no hay productos"
          console.log('Data de lista:',this.listaProductos.data ,this.listaProductos.data.length );
           if(! (this.listaProductos.data.length == 0) ){
             //creacion de elementos de paginacion
           for(let rt =0; rt < this.listaProductos.last_page; rt++){
            this.pgOptions[rt]= rt+1; 
            }
            console.log(this.pgOptions);
            //para titulo de seccion
            this.titleCat =this.getCategorys._bxCategory[this.idsProduct[0]-1].name;
            this.titleSubcat =this.getCategorys._bxCategory[this.idsProduct[0]-1].subcategories[this.idsProduct[1]-1].name;
            console.log(this.titleSubcat);
            
            this.spinner.hide();
          }else{
            console.log('mostran mensaje de VOID');
            this.spinner.hide();
            //flag de existencia de productos
            this.empty=true;
          }
          //manejador de paginacion
          //setear estados iniciales
         },err=>{
            this.spinner.hide();
            this.openDialog('Ha ocurrido un error en la carga de los productos');
           
         }
       )
     }
    }
    
   

  getProductsPG( par,pathBx: number | string){
        console.log(par);
        console.log(pathBx);
        pathBx = Number(pathBx);
    if(pathBx <= 0){
        pathBx = 1
      }
      if(pathBx >= this.listaProductos.last_page){
        pathBx = this.listaProductos.last_page;
      }
       
      if(pathBx!=undefined){
        console.log(pathBx);
        this.spinner.show();
        this.getCategorys.getListPWPath('categories/'+this.idsProduct[0]+'/subcategories/'+this.idsProduct[1]+'/products?page='+pathBx).subscribe(
          req =>{
            console.log('quest pag ok',req);
            this.listaProductos=req;
          
            //this.handlerPagination(par,  this.listaProductos.current_page, this.listaProductos.last_page );
            //llevar scroll a top
            window.scroll(0,0);
            this.spinner.hide();
          },err =>{
            this.openDialog('Ha ocurrido un error en la carga de los productos');
            console.log(err);
          },()=>{
            console.log('finaliza peticion');
            window.scroll(0,0);
            this.spinner.hide();
          } ).add(
            console.log('peticion add')
          )
      }
  } 
  openDialog(mensaje:string): void {
    const dialogRef = this.modal.open(ModalErrComponent, {
      data: {title: 'Ooops!', description: mensaje}
    });
  }
  /* 
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
} */
}