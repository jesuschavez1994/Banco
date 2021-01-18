import { Component, OnInit, OnDestroy, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { GetCategorysService } from '.././services/get-categorys.service';
import { Category } from '@interfaces/categorys';
import { Router} from '@angular/router';


@Component({
  selector: 'app-categorys',
  templateUrl: './menu-categorys.component.html',
  styleUrls: ['./menu-categorys.component.scss']
})
export class MenuCategorysComponent implements OnInit {
  userLog = false;
  boxCategory: Category;

  constructor(private getCategorysService: GetCategorysService,  
              private router: Router,  ) { }

  ngOnInit(): void {

    this.boxCategory = this.getCategorysService._bxCategory;
      if(this.boxCategory== undefined){
        
       this.obtCategories();
      }

  }
  ngOnDestroy(){
    if(this.boxCategory!=undefined){
      this.getCategorysService._bxCategory= this.boxCategory;
    }
  }
  obtCategories(){
    this.getCategorysService.getCategoryList().subscribe( 
         cat => {
           this.boxCategory = cat;
         }
       )
     } 
  showProducts(cat: number , subcat: any){
    //Busqueda por categoria
    console.log(cat + ' '+subcat );
    if(subcat != 'none'){
      this.router.navigate(['categorys',encodeURI(this.boxCategory[cat].name),encodeURI(this.boxCategory[cat].subcategories[subcat].name),'products']);

    }else{
      //busqueda por sub categoria
      this.router.navigate(['categorys',encodeURI(this.boxCategory[cat].name),'products']);
      
    }
    
    
  }
  }
