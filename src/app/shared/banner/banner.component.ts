import { Component, HostListener, Input, OnInit } from '@angular/core';
import { bannerOptions } from '@interfaces/componentsOptions/banner.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() imgs: bannerOptions = {
    s: 'assets/img/no-image-banner.jpg',
    m: 'assets/img/test-img/banner.png',

  };

  currentImg = this.imgs.m;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  public changeImg( $event: Event){
    const widthWindow = window.innerWidth;
    console.log(widthWindow);

    if ( widthWindow > 480 ) {
      this.currentImg = this.imgs.m;

    }else if ( widthWindow <= 480 ) {

      if (this.imgs.s >= ''){
        this.currentImg = this.imgs.s;
      }

    }
  }
}
