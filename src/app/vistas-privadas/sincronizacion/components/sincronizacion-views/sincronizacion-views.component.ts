import { Component, OnInit } from '@angular/core';
import { BannerOptions }  from '@interfaces/components-options/banner.options.interface';
@Component({
  selector: 'app-sincronizacion-views',
  templateUrl: './sincronizacion-views.component.html',
  styleUrls: ['./sincronizacion-views.component.css']
})
export class SincronizacionViewsComponent implements OnInit {

  imgsBanners: BannerOptions = {
    m: 'assets/img/Banner/Banner1.svg'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
