import {
  Component,
  HostListener,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';

import { BannerService } from '@shared/banner/services/banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
// export class BannerComponent implements OnInit, OnChanges {
export class BannerComponent implements OnInit, OnChanges {
  @Input() imgs: BannerOptions;

  currentImg: string;
  widthWindow = 480;

  images: any;
  bannerSubscription: Subscription;
  constructor(private _bannerService: BannerService) {
    this.bannerSubscription = _bannerService.bannerImageData$.subscribe(
      (bannerData: any) => {
        console.log('Banner data observable on banner.component:');
        console.log(bannerData);
        // this.images = bannerData;
        // this.currentImg = this.images.xl;
        // console.log('Current banner images:');
        // console.log(this.images);
      }
    );
  }

  ngOnInit(): void {
    if (this.imgs) {
      this.currentImg = this.imgs.m;
    }

    // console.log('ngOnInit - imgs');
    // console.log(this.imgs);
  }

  ngOnChanges() {
    // console.log('Changes ngOnInit - imgs');
    // console.log(this.imgs);
    // console.log(this.currentImg);

    this.loadCurrentImg();
  }

  @HostListener('window:resize', ['$event'])
  public changeImg($event: Event) {
    this.widthWindow = window.innerWidth;

    this.loadCurrentImg();
  }

  public loadCurrentImg() {
    if (this.imgs) {
      if (this.widthWindow > 480) {
        this.currentImg = this.imgs.m;
      } else if (this.widthWindow <= 480) {
        if (this.imgs.s !== '') {
          this.currentImg = this.imgs.s;
        }
      }
    }
  }
}
