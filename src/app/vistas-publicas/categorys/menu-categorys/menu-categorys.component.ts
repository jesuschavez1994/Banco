import { Component, OnInit, OnDestroy, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { GetCategorysService } from '.././services/get-categorys.service';
import { Category } from '@interfaces/categorys';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrComponent} from '@shared/modal-err/modal-err.component'
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-categorys',
  templateUrl: './menu-categorys.component.html',
  styleUrls: ['./menu-categorys.component.scss']
})
export class MenuCategorysComponent implements OnInit {
  userLog = false;
  loadError :boolean =false;
  boxCategory: Category;
  //par de id de categorias y sub categorias
  stateid: number[] = [null,null];
  constructor(private getCategorysService: GetCategorysService,  
              private router: Router,
              private spinner : NgxSpinnerService,
              private modal : MatDialog  ) {
                console.log('menu constructor');
               }

  ngOnInit(): void {
    this.spinner.show();
    console.log('menu on Init')
    //si el request de las categorias ya ha sido realizado
    //obtiene su valor
    this.boxCategory = this.getCategorysService._bxCategory;
    if(this.boxCategory== undefined){
       this.obtCategories();
       console.log('obtCategories get');
      }else{
       console.log('obtCategories saved load');
      this.boxCategory = this.getCategorysService._bxCategory;
      this.spinner.hide();
      }

  }
  ngOnDestroy(){
    //guarda en servicio el request
    console.log('destroy menu:', this.boxCategory, this.stateid)
    if(this.boxCategory!=undefined){
      this.getCategorysService._bxCategory= this.boxCategory;
    }

    // envio a servicio de ids para posteriores consultas
    if(this.stateid != undefined && this.stateid.length != 0 ){
      this.getCategorysService._boxEstateRequestId[0]=this.stateid;

    }
  }
  obtCategories(){
    this.getCategorysService.getCategoryList().subscribe( 
         cat => {
           this.boxCategory = cat;
          console.log('categorias obtenidas');
          this.spinner.hide();
          
          },
          error=>{
            console.log('error cargando categorias ',error);
            this.spinner.hide();
            this.openDialog('Ha ocurrido un error cargando la lista de categorias');

          }
          )
     } 
  showProducts(cat: number , subcat: any){
    

    //Busqueda por categoria
    if(subcat != 'none'){
       //preparamos envio de ids para posteriores consultas
       // cat & subcat == index !!
       // index +1 == 'id'
       this.stateid[0]=cat+1;
       this.stateid[1]=subcat+1;
      console.log('redirect ', this.stateid);
      
      this.router.navigate(['categorys',encodeURI(this.boxCategory[cat].name),encodeURI(this.boxCategory[cat].subcategories[subcat].name),'products']);
     

    }else{
      //busqueda por sub categoria
      this.router.navigate(['categorys',encodeURI(this.boxCategory[cat].name),'products']);
      this.stateid.push(cat);

      
    }
    
    
  }
  openDialog(mensaje:string): void {
    const dialogRef = this.modal.open(ModalErrComponent, {
      data: {title: 'Ooops!', description: mensaje}
    });
  }

}