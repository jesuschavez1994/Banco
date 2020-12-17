import { Component, OnInit } from '@angular/core';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
@Component({
  selector: 'app-sincronizacion-views',
  templateUrl: './sincronizacion-views.component.html',
  styleUrls: ['./sincronizacion-views.component.css']
})
export class SincronizacionViewsComponent implements OnInit {

  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
