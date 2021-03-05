import { Component, OnInit,OnChanges,OnDestroy } from '@angular/core';
import { ProductCategories } from '@interfaces/productCategories';
import { Service } from '@services/service.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { GetCategorysService } from '../services/get-categorys.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrComponent} from '@shared/modal-err/modal-err.component'
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
 import {
   Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter
} from '@interfaces/components-options/sidebar-list.options.interface';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { Category } from '@interfaces/categorys';
import { Title } from '@angular/platform-browser';

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
                private rutaActiva: ActivatedRoute,
                public spinner: NgxSpinnerService,
                private modal : MatDialog,
                private titleService: Title
                ) {

      console.log('Constructor list product');

    // *************************************************
    // Obtiene IDs de request anterior de haberlo
    // mediante el obtiene paramtros para la consulta de productos
    // -- abandonado

    /*
      if (this.getCategorys._boxEstateRequestId[0] != undefined){
        console.log('anterior request products ',this.getCategorys._boxEstateRequestId[0]);
        this.idsProduct= this.getCategorys._boxEstateRequestId[0];
      }
      console.log('setting list product', this.getCategorys._requestCategoryL);
     */
    // *************************************************


    // ************************************************
    // Obtiene lista de productos de haberse precargado
    // sino los toma para no pedirlos de nuevo
    // -- abandonado
    /*
     if(this.getCategorys._requestCategoryL == undefined){
      console.log('pidiendo productos', this.idsProduct , this.listaProductos , this.getCategorys._requestCategoryL);
      this.obtProduct();
     }else{
      this.listaProductos = this.getCategorys._requestCategoryL;
     }
     */
    // *************************************************
    // *************************************************
     // FIN CONSTRUCTOR
  }

    // *************************************************
    // parametros para filtro
    // *************************************************

  // sidebar-list
  expandSidebar = true;
  anchorsMenu: AnchorsMenu;
  profile: Profile;
  value: string

    // PROPIEDADES DE COMPONENTE

    breadCru: BreadcrumbOptions[]=[ ];
    //peticion paginacion
    // peticionesPP: ProductCategories[];

    // peticion lista de Productos
    listaProductos: ProductCategories;

    // Identificador Ids subcat y cat
     idsProduct: number[]=[];
    //Array que contendra rutas de items paginacion
    pgOptions: number[]=[];

    //respuesta .data empty
    empty: boolean=false;

    // titulo de categoria de seleccion
    //titleCat: string;

    // titulo de subcategoria de seleccion
    titleSubcat: string;
    // Categorias
    dataCategory: Category;
  ngOnChanges(){

    console.log('on changes list product', this.getCategorys._requestCategoryL);
    // Si lista de productos ya ha sido obtenida es usada
    // -- abandonado
    /*
    if(this.getCategorys._requestCategoryL == undefined){
      this.obtProduct();
     }else{
      this.listaProductos = this.getCategorys._requestCategoryL;
     } */
  }
  ngOnInit(): void {

    console.log('show spinner');

      this.obtenerParams();
      this.obtMenuCat();
    // siempre obtiene lista de productos
      this.obtProduct();

    // Si productos no obtenidos
    // Obtenerlos
    // -- abandonado
    // console.log('on init list product', this.getCategorys._requestCategoryL);
   /* if(this.getCategorys._requestCategoryL == undefined){

        this.obtProduct();
      } */

  }

ngOndestroy(){

  console.log('on destroy list product');
  //guardar la ultima respuesta obtenida

  // guarda lista de productos en servicio
  // al destruir componente
  // -- abandonado
  /* if(this.listaProductos!= undefined){
  this.getCategorys._requestCategoryL =this.listaProductos;
  console.log(this.listaProductos);
  console.log(this.getCategorys._bxCategory);
  }
   */


}
  //Obtiene listado de productos

  obtenerParams(){
    this.rutaActiva.params.subscribe(
      (params: Params)=>{
        if(params.categories!= undefined){
          this.idsProduct[0]= params.categories;

        }
        if(params.subcategories!= undefined){
          this.idsProduct[1]= params.subcategories;

        }
        if(params.page!= undefined){
          this.idsProduct[2]= params.page;
        }
      }
    );
  }
  // para asegurar independencia de componente
  // metodo para obtener Titulo
  obtMenuCat(){

      this.getCategorys.getCategoryList().subscribe(
        cat => {
        this.dataCategory = cat;
         console.log('categorias obtenidas');
         console.log('categorias para titulo',this.dataCategory);
         // brinda error tslint desconosco la razón, pero funciona
         // Fixed, idsProduct solo debe  aceptar numeros para que la alerta no surja
         if(this.idsProduct[1] != undefined){

          this.titleSubcat = this.dataCategory[this.idsProduct[0]-1].subcategories[this.idsProduct[1]-1].name;

          // Capitalizamos el nombre de la Categoria //
          this.value = this.titleSubcat.toLocaleLowerCase();
          let descripcion = this.value.split(' ');

          for ( const i in descripcion){
            descripcion[i] = descripcion[i][0].toUpperCase() + descripcion[i].substr(1);
          }

           this.setTitle('Founduss | ' + ' ' + descripcion.join(' '));

         }else{
          this.titleSubcat = this.dataCategory[this.idsProduct[0]-1].name;
          this.setTitle(this.titleSubcat);
         }
         this.spinner.hide();
         },
         error=>{
           console.log('error cargando categorias ',error);
           this.spinner.hide();
           this.openDialog('Ha ocurrido un error cargando la lista de categorias');
           }
         )


         //this.titleCat =this.getCategorys._bxCategory[this.idsProduct[0]-1].name;

  }
  obtProduct(){
    this.spinner.show();



    // -- abandonado
    // ***********************************************
    //Si no existe referencia de productos
    //redireccion a categorys

    /* if(this.idsProduct == undefined){
      console.log('redireccion', this.idsProduct);
      this.router.navigate(['categorys']);
    }else{
    //obtencion de data primera mano
    //tarea asincronica
    console.log('pidiendo lista prooductos');
  }
  )
  // ***********************************************

  */
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
              //this.titleCat =this.getCategorys._bxCategory[this.idsProduct[0]-1].name;
              //this.titleSubcat =this.getCategorys._bxCategory[this.idsProduct[0]-1].subcategories[this.idsProduct[1]-1].name;
            /*   this.breadCru=[ {title: 'Home', routerLink:['/']},
                              {title: 'Categorias', routerLink:['categorys']},
                              {title:this.titleCat, routerLink:['categorys',this.titleCat,'products']},
                              {title:this.titleSubcat, routerLink:['categorys',this.titleCat,this.titleSubcat,'products']}];

                              console.log(this.titleSubcat);
                              */


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

          })
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
        if(this.idsProduct[1]!= undefined){

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
        }else{
          this.getCategorys.getListPWPath('categories/'+this.idsProduct[0]+'/products?page='+pathBx).subscribe(
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
  }
  openDialog(mensaje:string): void {
    const dialogRef = this.modal.open(ModalErrComponent, {
      data: {title: 'Ooops!', description: mensaje}
    });
  }
  getProductDetail(idStore,idProduct){
    console.log('route',idStore,idProduct);
    this.router.navigate(['business-detail',idStore,'products',idProduct]);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
