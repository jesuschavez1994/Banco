import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { HomeServiceService } from '../../../vistas-publicas/services/home-service.service';
import { environment } from '@environments/environment';

import { AvatarService } from '@shared/public-navbar/avatar/services/avatar.service';
import { Image } from '@interfaces/userPublic.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit, OnDestroy {
  userId: number | string;
  userImg: any;
  actualImg: any; // Previous image fallback
  userName: string;
  userEmail: string;
  envApi = environment.url;

  @Input() imgCropper: any;

  storeAct: boolean | string = false;
  imgSrc: string;
  subscription: Subscription;

  constructor(
    private auth: StoreService,
    public homeService: HomeServiceService,
    private _avatarService: AvatarService
  ) {
    this.imgUser();
    this.subscription = _avatarService.imageData$.subscribe(
      (imageData: Image[]) => {
        this.checkImgData(imageData);
      }
    );
  }

  ngOnInit(): void {
    this.storeAct = this.homeService.storeActive();
    console.log('storeAct', this.storeAct);
  }

  ngOnDestroy(): void {
    // Preventing memory leaks
    this.subscription.unsubscribe();
  }

  imgUser() {
    if (this.auth) {
      this.userId = localStorage.getItem('id');
      this.homeService.obtUserData(this.userId).subscribe((data) => {
        this.userImg = data.image;
        this._avatarService.setImageData(data.image);
        this.userEmail = data.email;
        this.userName = data.name;
        console.log(data);
      });
    }
  }
  logout() {
    this.auth.logout();
    // window.location.reload();
  }

  private checkImgData(imageData: any) {
    imageData === 'Use previous image'
      ? this.useFallback()
      : this.formatImgSource(imageData);
  }

  private formatImgSource(imageData: any) {
    this.actualImg = imageData;

    Array.isArray(imageData)
      ? (this.imgSrc = this.actualImg[0].src)
      : (this.imgSrc = this.actualImg);
  }

  private useFallback() {
    this.actualImg = this.userImg;
  }
}
