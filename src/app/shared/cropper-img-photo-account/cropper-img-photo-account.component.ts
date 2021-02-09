import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-cropper-img-photo-account',
  templateUrl: './cropper-img-photo-account.component.html',
  styleUrls: ['./cropper-img-photo-account.component.scss']
})
export class CropperImgPhotoAccountComponent implements OnInit {

  currentImg: string;
  isOpen = false;
  isexpand = false;

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor() { }

  ngOnInit(): void {
  }

  CloseEvent(e: boolean){
   this.isOpen = e;
  }

}
