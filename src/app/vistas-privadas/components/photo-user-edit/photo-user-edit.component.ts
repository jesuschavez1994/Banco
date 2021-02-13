import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { Avatar } from '@models/avatar.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-photo-user-edit',
  templateUrl: './photo-user-edit.component.html',
  styleUrls: ['./photo-user-edit.component.scss']
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
  alert = false;
  Recortador = false;
  type_fyle: string;
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


  fileChangeEvent(archivo: any) {
    if ( !archivo ) {
      this.imageChangedEvent = null;
      return;
    }

    if ( archivo ) {
      this.type_fyle = archivo.target.files[0].type;
      this.alert = true;
      this.Recortador = false;
      this.mostrarAvatar = true;
      setTimeout(() => {
        this.imageChangedEvent = archivo;
        this.alert = false;
        this.Recortador = true;
        this.mostrarAvatar = true;
      }, 3000);
    }
    this.textFooterImages = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.cropper.get('avatar').setValue(this.croppedImage);
  }
  imageLoaded() {
  }
  cropperReady() {
  }
  loadImageFailed() {
  }
  CropperImg(){
    //  this.usuarioService.subirArchivo(localStorage.getItem('id'))
  }

  cambiarImagen(){
    const avatar = new Avatar(
      this.cropper.value.avatar
    );
    this.usuarioService.ImagenPerfil(avatar, localStorage.getItem('id')).subscribe((Response: any) => {
      console.log('Response Avatar', Response.src);
      this.IMG_USER = URL_SERVICIOS + '/' + Response.src;
      console.log(this.IMG_USER);
      this.mostrarAvatar = false;
    });
  }

  GetAvatar(){
    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      console.log('avatar', Response);
      this.IMG_USER = Response[0].src;
      console.log(this.IMG_USER);
      this.spinner = true;
    });
  }


}
