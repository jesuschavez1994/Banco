import { Component, OnInit } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  // **** Input **** //

  /**********/
 /* // sidebar-list
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
*/
  constructor(  
    private router: Router, ) { }

  ngOnInit(): void {
  }

}
