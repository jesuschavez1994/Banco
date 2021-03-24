import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BannerImage, Srcsize } from '@interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  // Observable data sources
  private bannerImageDataSource = new Subject<
    BannerImage[] | Srcsize | string
  >();
  private bannerEditImageDataSource = new Subject<BannerImage[] | any>();

  // Observable data streams
  bannerImageData$ = this.bannerImageDataSource.asObservable();
  bannerEditImageData$ = this.bannerEditImageDataSource.asObservable();

  // Service commands
  setBannerImage(bannerImages: BannerImage[] | Srcsize | string) {
    console.log('Data passed from params: ');
    console.log(bannerImages);
    this.bannerImageDataSource.next(bannerImages);
  }
}
