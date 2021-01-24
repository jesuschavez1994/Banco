import { Component, OnInit,OnDestroy } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { ProductCategories } from '@interfaces/productCategories';
import { Service } from '@services/service.service';
import { Router } from '@angular/router';
import { GetCategorysService } from '.././services/get-categorys.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
                ) {
                  console.log('Constructor list product');
      /* Obtiene el ultimo valor que envio el menu */
      if(this.getCategorys._boxEstateRequestId[0]!= undefined){
        console.log('anterior request products ',this.getCategorys._boxEstateRequestId[0]);
        this.idsProduct= this.getCategorys._boxEstateRequestId[0];
      }
     }
     //peticion paginacion
    peticionesPP: ProductCategories[];
    //peticion lista de Productos
    listaProductos: ProductCategories;
    //Identificador Ids subcat y cat
    idsProduct: number[];
    //Array que contendra rutas de items paginacion
    pgOptions: string[]=[];
    //respuesta .data empty
    empty: boolean=false;
    //titulo de categoria de seleccion
    titleCat: string;
    //titulo de subcategoria de seleccion
    titleSubcat: string;
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
    //Si no existe referencia de productos
    //redireccion a categorys
    if(this.idsProduct == undefined){
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
            this.pgOptions[rt]= 'page='+(rt+1); 
            }
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
          console.log('setear estados iniciales pg');
           this.handlerPagination('none',  this.listaProductos.current_page, this.listaProductos.last_page );
         },err=>{
          this.spinner.hide();
           console.log('err' ,err);
         }
       )
     }
    }
    
  handlerPagination(parent: any, state: number,maxP: number ){
    if(parent != 'none'){
      /*Ignorado la 1era vez*/
      if(state <= 1){
        if(!parent.firstChild.classList.contains('disabled')){
        parent.firstChild.classList.add('disabled');
        }
      }
      if(state >= maxP){
        if(!parent.firstChild.classList.contains('disabled')){
        parent.firstChild.classList.add('disabled');
        }
      }
    }

  }

  getProductsPG( pathBx: string){
    console.log('peticion por path pg '+ pathBx );

      if(pathBx!=undefined){
        console.log(pathBx);
        this.spinner.show();
        this.getCategorys.getListPWPath('categories/'+this.idsProduct[0]+'/subcategories/'+this.idsProduct[1]+'/products?'+pathBx).subscribe(
          req =>{
            this.listaProductos=req;
            this.spinner.hide();
          } );
      }
  } 
}