import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { GetCategorysService } from './services/get-categorys.service';
import { Category } from '@interfaces/categorys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  userLog = false;
  boxCategory: Category;

  constructor(private getCategorysService: GetCategorysService,  
              private router: Router,  ) { }

  ngOnInit(): void {
    this.obtCategories();
  }
  obtCategories(){
    this.getCategorysService.getCategoryList().subscribe( 
      cat => {
        console.log(cat);
        this.boxCategory = cat;

      }
    )
  }
  showProducts(cat: number , subcat: number){
    //Busqueda por categoria
    if( subcat != 0){
      this.router.navigate([]);
    }else{
      this.router.navigate([]);

    }
    //busqueda por sub categoria
    
  }
}
