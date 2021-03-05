import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '@services/usuario/usuario.service';

import { environment } from '@environments/environment';
import { URL_SERVICIOS } from '../../config/config';
import { AvatarService } from '@shared/public-navbar/avatar/services/avatar.service';
import { CropperService } from '@shared/cropper-img-photo-account/services/cropper.service';
import { Subscription } from 'rxjs';
import { HomeServiceService } from '../../vistas-publicas/services/home-service.service';

@Component({
  selector: 'app-cropper-img-photo-account',
  templateUrl: './cropper-img-photo-account.component.html',
  styleUrls: ['./cropper-img-photo-account.component.scss'],
})
export class CropperImgPhotoAccountComponent implements OnInit, OnDestroy {
  currentImg: string;
  ImgNew: string;
  ShowNewImgCrop = false;
  isOpen = false;
  isexpand = false;
  testImage: any;

  @Output() fileBase64: EventEmitter<any> = new EventEmitter();

  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right',
  ];

  store: string = 'store';
  avatar: string = 'avatar';
  options: string;
  storeAct: boolean | string = false;

  position = new FormControl(this.positionOptions[0]);

  subscription: Subscription;
  constructor(
    public usuarioService: UsuarioService,
    private _avatarService: AvatarService,
    private _cropperService: CropperService,
    public homeService: HomeServiceService
  ) {
    this.subscription = _cropperService.imageData$.subscribe(
      (imageData: string) => {
        this.currentImg = imageData;
      }
    );
  }

  ngOnInit(): void {
    this.GetAvatar();

    this.storeAct = this.homeService.storeActive();
    console.log('storeAct', this.storeAct);

    if (this.storeAct) {
      this.options = this.store;
    } else {
      this.options = this.avatar;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  CloseEvent(e: boolean) {
    this.isOpen = e;
  }

  ShowImage(eventData) {
    this._avatarService.setImageData(eventData);
  }

  GetAvatar() {
    this.usuarioService
      .datosUserImages(localStorage.getItem('id'))
      .subscribe((Response: any) => {
        if (Response.length >= 1) {
          this._cropperService.setImageSource(Response[0].src_size.xl);
        }
      });
  }

  succesFull($event) {
    this.isOpen = !$event;
  }
}
