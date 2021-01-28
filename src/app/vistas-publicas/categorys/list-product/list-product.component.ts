import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import { ProductCategories } from '@interfaces/productCategories';
import { Service } from '@services/service.service';
import { Router } from '@angular/router';
import { GetCategorysService } from '.././services/get-categorys.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrComponent} from '@shared/modal-err/modal-err.component'
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import {
  Category, Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter, Filter, PriceRange
} from '@interfaces/components-options/sidebar-list.options.interface';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';

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
                 /*  this.breadCru = this.getCategorys.generateBreadcrumb(); */
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


     /********************************* */
            
          // sidebar-list
          expandSidebar = true;
          anchorsMenu: AnchorsMenu;
          profile: Profile;
          categories: Category[];
          priceRanges: PriceRange[] = [
            { min: 0, max: 10000, totalFounds: 559 },
            { min: 10000, max: 20000, totalFounds: 58 },
            { min: 20000, max: 30000, totalFounds: 9 },
            { min: 30000, max: 40000, totalFounds: 1 },
            { min: 50000, max: 60000, totalFounds: 1 },
          ];
          filterOptions: FilterOption[] = [
            {label: 'filtrar por', value: 0},
            {label: 'producto', value: 1},
            {label: 'Empresa', value: 'hola'},
          ];
          factories: Filter[] = [
            {name: 'abbot', totalFounds: 1},
            {name: 'anc', totalFounds: 36},
            {name: 'andrómaatico', totalFounds: 1},
            {name: 'aura vitalis', totalFounds: 38},
            {name: 'bach', totalFounds: 7},
          ];
          delivery: Filter[] = [
            { name: 'si', totalFounds: 579 },
            { name: 'no', totalFounds: 274 },
          ];
          marks: Filter[] = [
            { name: 'albaderm', totalFounds: 16 },
            { name: 'Aquasolar', totalFounds: 3 },
            { name: 'Arama', totalFounds: 8 },
            { name: 'Bosque miel', totalFounds: 2 },
            { name: 'Brota', totalFounds: 5 },
          ];

     /*********************************** */
     breadCru: BreadcrumbOptions[]=[ ];
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
            this.breadCru=[ {title: 'Home', routerLink:['/']},
                            {title: 'Categorias', routerLink:['categorys']},
                            {title:this.titleCat, routerLink:['categorys',this.titleCat,'products']},
                            {title:this.titleSubcat, routerLink:['categorys',this.titleCat,this.titleSubcat,'products']}];
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
           console.log(err);
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
 
}