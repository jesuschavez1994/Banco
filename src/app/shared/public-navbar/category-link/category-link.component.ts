import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-link',
  template: ` <a [routerLink]="['/categories']"> CATEGORIAS </a>`,
  styleUrls: ['./category-link.component.scss'],
})
export class CategoryLinkComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
