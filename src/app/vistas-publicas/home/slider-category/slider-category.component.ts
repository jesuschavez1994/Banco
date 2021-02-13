import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, Input,ViewChild, ElementRef, Renderer2} from '@angular/core';
import { CategoriesHome, Product  } from "@interfaces/homeProduct.interface";
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.scss']
})
export class SliderCategoryComponent implements OnInit {
  @Input() _cat: CategoriesHome;
   
@ViewChild('container') scroll: ElementRef;
@ViewChild('carr') scrollable: ElementRef;
@ViewChild('back') back: ElementRef;
@ViewChild('next') next: ElementRef;

  listCategory: Product[];
  constructor(private render: Renderer2, private route: Router, ) { }
  
  ngOnInit(): void {
    this.listCategory = this._cat.products;
    console.log('ListCategorys', this.listCategory)
  }
  scrollRight(value){

    console.log(this.scroll.nativeElement.scrollLeft);
    this.scrollable.nativeElement.scrollLeft += value ;
    if(this.scrollable.nativeElement.scrollLeft >= this.scrollable.nativeElement.scrollWidth ){
      this.scrollable.nativeElement.scrollLeft=  this.scrollable.nativeElement.scrollWidth;
     this.next.nativeElement.setAttribute('disabled','true');
      // this.render.setAttribute(this.next.nativeElement,'disabled','true');
    }
  }
  scrollLeft(value){
    value = (value * (-1));
    
    this.scrollable.nativeElement.scrollLeft += value ;
    if(this.scrollable.nativeElement.scrollLeft <= 0 ){
      this.scrollable.nativeElement.scrollLeft=  0
      this.back.nativeElement.setAttribute('disabled','true');
      //this.render.setAttribute(this.back.nativeElement,'disabled','true');
    }
  }
  getProductDetail(idStore,idProduct){
    console.log('route',idStore,idProduct);
    this.route.navigate(['business-detail',idStore,'products',idProduct]);
  }
}
