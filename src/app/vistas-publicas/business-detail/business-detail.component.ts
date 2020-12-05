import { Component, OnInit } from '@angular/core';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';
import { bannerOptions } from '../../interfaces/components-options/banner.interface';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  productSelected = {
    imgs: [
      'assets/img/test-img/organic_protein.jpg',
      'assets/img/test-img/magazine_vegan_food.jpg',
      'assets/img/test-img/banner.png'
    ]
  };

  sidebarListCtr = new SidebarListControler();

  constructor() {
    this.sidebarListCtr.expandSidebarlist = true;
  }

  ngOnInit(): void {
  }

}
