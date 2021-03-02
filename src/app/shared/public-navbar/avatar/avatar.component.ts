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
        console.log('User image data:');
        console.log(imageData);
        // this.userImg = imageData;
        this.formatImgSource(imageData);
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
        // this.userImg = data.image; // Testing the service
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

  formatImgSource(imageData: any) {
    this.userImg = imageData;

    console.log('Checking if data is an array: ');
    console.log(Array.isArray(imageData));

    Array.isArray(imageData)
      ? (this.imgSrc = `${this.envApi}/${this.userImg[0].src}`)
      : (this.imgSrc = this.userImg);

    console.log('Image source');
    console.log(this.imgSrc);
  }
}
