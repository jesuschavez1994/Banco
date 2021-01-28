import { Component, OnInit, Input } from '@angular/core';
import { CategoriesHome, Product  } from "@interfaces/homeProduct.interface";
@Component({
  selector: 'app-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.scss']
})
export class SliderCategoryComponent implements OnInit {
  @Input() _cat: CategoriesHome;
  listCategory: Product[];
  constructor() { }

  ngOnInit(): void {
    this.listCategory= this._cat.products;
  }

}
