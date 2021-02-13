import { Component, OnInit, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CropperPosition, ImageTransform, Dimensions } from '@interfaces/cropper/cropper';

@Component({
  selector: 'app-dropzone-photo',
  templateUrl: './dropzone-photo.component.html',
  styleUrls: ['./dropzone-photo.component.scss']
})
export class DropzonePhotoComponent implements OnInit {

  @ViewChild('dropzone') dropzone: ElementRef;

  //Output //
  @Output() HidenDropZone = new EventEmitter<any>();
  @Output() ImagenCropped = new EventEmitter<any>();
  @Output() SaveSuccesFullImage = new EventEmitter<boolean>(); 

  isexpand = false;

  currentImg: string;
  files: any[] = [];
  isOpen = true;
  spinner = false;
  imageChangedEvent: any = '';
  // tslint:disable-next-line: member-ordering
  croppedImage: any = '';
  IMG_USER: string;
  type_fyle: string;
  showInput = true;
  showCropper = false;
  showFooter = false;
  img_base64: any;
  ErrorImageFailed = false;
  NameFile: string;

  // Estados del subscribe //
  state: boolean = false;
  AlertSucces = false;
  ErrorAlert = false ;

  transform: ImageTransform = {};
  scale = 1;
  containWithinAspectRatio = true;
  

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  stateSpinner($event: any){
    console.log($event);
    this.spinner = $event.spinner;
    this.AlertSucces = $event.AlertSucces;
    this.ErrorAlert = $event.ErrorAlert;
    
    if(this.AlertSucces){
      setTimeout( () => this.SaveSuccesFullImage.emit(this.AlertSucces), 6000);
    }
    

  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

      //  **** Disminuir el Zoom **** //
  zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  // **** Aumentar el Zomm **** //
  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
        scale: this.scale
      };
  }

  // **** Girar Horizontalmente **** //
  flipHorizontal() {
      this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  // **** Girar Verticalmente **** //
  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  StateCambiarImg(event: boolean){
    this.isexpand = false;
    this.showInput = true;
  }

  imageCropped(event: ImageCroppedEvent) {

    console.log('ImageCroppedEvent', event)
    
    this.croppedImage = event.base64;
    console.log('IMAGEN LOAD', this.croppedImage);
    this.showFooter = true;
    setTimeout(() => this.ImagenCropped.emit(this.croppedImage), 0);
    
  }

  imageLoaded(image?: HTMLImageElement) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  Close(){
    this.isOpen = !this.isOpen;
    this.HidenDropZone.emit(this.isOpen);
    this.showCropper = false;
    this.isexpand = false;
    this.showInput = true;
    this.ErrorImageFailed = false;
    if (this.showInput === true){
      this.croppedImage = 'assets/img/Banner/Banner1.svg'; // => Acá tengo hacer una promesa y verificar si no existe un banner en el backend
    }
  }

  public fileBrowseHandler(archivo: any){
    if ( !archivo ) {
      this.imageChangedEvent = null;
      return;
    }

    if ( archivo ) {
      this.type_fyle = archivo.target.files[0].type;
      // this.prepareFilesList(archivo.target.files);
      this.showInput = false;
      this.renderer.removeClass(this.dropzone.nativeElement, 'min-dropzone');
      this.imageChangedEvent = archivo;
      const longitud = archivo.target.files[0].name.length;
      const  name = archivo.target.files[0].name.split(' ');
      this.NameFile = this.modificarname(name, longitud),
      console.log('names files', this.NameFile);

    }
  }

  modificarname(name: any, longitud: number){
    for ( const i in name){
      return   name[i] = name[i][0].toUpperCase() + name[i].substr(1, longitud - 5);
    }
  }

  // prepareFilesList(files: Array<any>) {

  //   if (this.files.length >= 1){
  //     this.files.splice(0, 1);
  //     for (const item of files) {
  //       item.progress = 0;
  //       this.files.push(item);
  //       console.log(this.files);
  //     }
  //   }else{
  //     for (const item of files) {
  //       item.progress = 0;
  //       this.files.push(item);
  //       console.log(this.files);
  //     }
  //   }
  //   this.uploadFilesSimulator(0);

  // }

  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.isexpand = true;
  //           this.showCropper = true;
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }
  

}
