import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Negocio } from '../../models/negocio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Avatar } from '../../models/avatar.model';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  forma: FormGroup;
  cropper: FormGroup;
  items: any = {};
  userStore: Negocio;
  usuario: Usuario;
  token: string;
  datosUsuario: any[] = [];
  // tslint:disable-next-line: member-ordering
  imageChangedEvent: any = '';
  // tslint:disable-next-line: member-ordering
  croppedImage: any = '';
  textFooterImages = false;
  imagenSubir: File;
  avatar: File;
  IMG_USER: string;
  mostrarAvatar = false;



  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    public usuarioService: UsuarioService
  ) {

    // this.usuario = this.toObject.user;
    console.log(this.usuario);

    this.forma = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.cropper = new FormGroup({
      avatar: new FormControl(''),
    });


  }

  ngOnInit() {
    this.userStoreServices.getStore().subscribe(resp => {
      this.datosUsuario.push(resp);
    });

    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      this.IMG_USER = URL_SERVICIOS + '/' + Response[0].src;
      console.log(this.IMG_USER);
    });
  }


ActualizarDatosUser(user: Usuario){

  const Userstore = new Usuario(
    this.forma.value.username,
    this.forma.value.name,
    this.forma.value.email,
    this.forma.value.password,
    this.forma.value.phone,
  );

  this.userStoreServices.ActualizarUsuarioNegocio(localStorage.getItem('id'), Userstore).subscribe( usuarioActualizado => {
    console.log('Data', usuarioActualizado);
    const usuarioDB: any = usuarioActualizado;
    this.guardarStorage(usuarioDB.id, localStorage.getItem('token'));
    // this.guardarStorage(data.id, )
  });

}

guardarStorage(id: string, token: string){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  this.token = token;
}

Reset(){
  this.forma.reset(this.usuario);
}

  fileChangeEvent(archivo: File) {

    if ( !archivo ) {
      this.imageChangedEvent = null;
      return;
    }

    this.mostrarAvatar = true;

    this.imageChangedEvent = archivo;
    this.textFooterImages = true;
    console.log(this.imagenSubir);

  }

  imageCropped(event: ImageCroppedEvent) {

    this.croppedImage = event.base64;
    this.cropper.get('avatar').setValue(this.croppedImage);
    console.log(this.croppedImage);
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
    this.usuarioService.cambiarImagen(avatar, localStorage.getItem('id')).subscribe();
    this.mostrarAvatar = false;
  }

}

