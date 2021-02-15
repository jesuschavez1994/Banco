import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ConverToBase64 } from '@utils/convertToBase64';

import { environment } from '@environments/environment'

@Component({
  selector: 'app-cropper-img-photo-account',
  templateUrl: './cropper-img-photo-account.component.html',
  styleUrls: ['./cropper-img-photo-account.component.scss']
})
export class CropperImgPhotoAccountComponent implements OnInit {

  currentImg: string;
  ImgNew: string;
  ShowNewImgCrop = false;
  isOpen = false;
  isexpand = false;
  testImage: any

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.GetAvatar();
  }

  CloseEvent(e: boolean){
   this.isOpen = e;
  }

  ShowImage(event){
    this.ImgNew = event;
    this.ShowNewImgCrop = true;
    console.log('Current',this.currentImg)
  }

  GetAvatar(){
    this.usuarioService.datosUserImages(localStorage.getItem('id'))
    .subscribe( (Response: any) => {
      console.log('avatar', Response);
      if(Response.length >= 1){
        this.currentImg = Response[0].src_size.xl;
      }
    });
  }

  succesFull($event){
    this.isOpen = !$event;
  }

}
