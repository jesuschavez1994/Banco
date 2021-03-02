import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '@services/usuario/usuario.service';

import { environment } from '@environments/environment';
import { AvatarService } from '@shared/public-navbar/avatar/services/avatar.service';
import { Image } from '@interfaces/userPublic.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cropper-img-photo-account',
  templateUrl: './cropper-img-photo-account.component.html',
  styleUrls: ['./cropper-img-photo-account.component.scss'],
})
export class CropperImgPhotoAccountComponent implements OnInit {
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
  position = new FormControl(this.positionOptions[0]);

  constructor(
    public usuarioService: UsuarioService,
    private _avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.GetAvatar();
  }

  CloseEvent(e: boolean) {
    this.isOpen = e;
  }

  ShowImage(eventData) {
    this._avatarService.setImageData(eventData);
    this.ImgNew = eventData;
    this.ShowNewImgCrop = true;
    // setTimeout(() => this.FileBase64.emit(event), 0);
    // console.log('Current', this.currentImg);
    // this.fireEvents(eventData);
  }

  GetAvatar() {
    this.usuarioService
      .datosUserImages(localStorage.getItem('id'))
      .subscribe((Response: any) => {
        console.log('avatar', Response);
        if (Response.length >= 1) {
          this.currentImg = Response[0].src_size.xl;
        }
      });
  }

  succesFull($event) {
    this.isOpen = !$event;
  }

  fireEvents(eventData) {
    console.log('Image data to send with events:');
    console.log(eventData);
    this.fileBase64.emit(this.ImgNew);
  }
}
