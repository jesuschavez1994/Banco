import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.scss']
})
export class SliderCategoryComponent implements OnInit {
  listCategory = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9'];
  constructor() { }

  ngOnInit(): void {
  }

}
