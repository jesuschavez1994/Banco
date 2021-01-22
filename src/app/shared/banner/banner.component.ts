import { Component, HostListener, Input, OnInit, OnChanges } from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
// export class BannerComponent implements OnInit, OnChanges {
export class BannerComponent implements OnInit, OnChanges {

  @Input() imgs: BannerOptions;

  currentImg: string;
  widthWindow = 480;

  constructor() { }

  ngOnInit(): void {
    if (this.imgs) {
      this.currentImg = this.imgs.m;
    }

    console.log('ngOnInit - imgs');
    console.log(this.imgs);

  }

  ngOnChanges() {
    console.log('Changes ngOnInit - imgs');
    console.log(this.imgs);
    console.log(this.currentImg);

    this.loadCurrentImg();

  }

  @HostListener('window:resize', ['$event'])
  public changeImg( $event: Event){
    this.widthWindow = window.innerWidth;

    this.loadCurrentImg();

  }

  public loadCurrentImg() {
    if (this.imgs) {

      if ( this.widthWindow > 480 ) {
        this.currentImg = this.imgs.m;

      }else if ( this.widthWindow <= 480 ) {

        if (this.imgs.s !== ''){
          this.currentImg = this.imgs.s;
        }

      }
    }
  }
}
