import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { Avatar } from '../../../models/avatar.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-photo-user-edit',
  templateUrl: './photo-user-edit.component.html',
  styleUrls: ['./photo-user-edit.component.css']
})
export class PhotoUserEditComponent implements OnInit {

  cropper: FormGroup;
  imageChangedEvent: any = '';
  // tslint:disable-next-line: member-ordering
  croppedImage: any = '';
  textFooterImages = false;
  imagenSubir: File;
  avatar: File;
  mostrarAvatar = false;
  IMG_USER: string;
  spinner = false;

  // sALIDAS//
  // tslint:disable-next-line: variable-name
  @Output() mostarComponent: EventEmitter<any>;

  constructor(public usuarioService: UsuarioService) {

    this.mostarComponent = new EventEmitter();

    this.cropper = new FormGroup({
      avatar: new FormControl(''),
    });
  }

  ngOnInit() {
    this.GetAvatar();
  }


  fileChangeEvent(archivo: File) {
    if ( !archivo ) {
      this.imageChangedEvent = null;
      return;
    }
    this.mostrarAvatar = true;
    this.imageChangedEvent = archivo;
    this.textFooterImages = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.cropper.get('avatar').setValue(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  CropperImg(){
    //  this.usuarioService.subirArchivo(localStorage.getItem('id'))
  }

  cambiarImagen(){
    const avatar = new Avatar(
      this.cropper.value.avatar
    );
    this.usuarioService.cambiarImagen(avatar, localStorage.getItem('id')).subscribe((Response: any) => {
      console.log(Response.src);
      this.IMG_USER = URL_SERVICIOS + '/' + Response.src;
      console.log(this.IMG_USER);
    });
    this.mostrarAvatar = false;
  }


  GetAvatar(){
    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      this.IMG_USER = URL_SERVICIOS + '/' + Response[0].src;
      this.spinner = true;
    });
  }


}
