import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {
  StoreResponse,
  Bannerimage,
  Srcsize,
} from '@interfaces/store.interface';
import { UserStoreService } from '@services/user-store/user-store.service';

import { BannerService } from '@shared/banner/services/banner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.scss'],
})
export class BannerEditComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() imgs: Srcsize;
  @Input() Onerror: boolean;

  @ViewChild('dropzone') dropzone: ElementRef;
  isexpand = false;

  currentImg: string;
  files: any[] = [];
  isOpen = false;

  imageChangedEvent: any = '';
  // tslint:disable-next-line: member-ordering
  croppedImage: any = '';
  IMG_USER: string;
  type_fyle: string;
  showInput = true;
  showCropper = false;
  img_base64: any;
  ErrorImageFailed = false;
  NameFile: string;

  @HostBinding('class.fileover') fileover: boolean;

  // Banner related parameters
  images: any;
  bannerSubscription: Subscription;

  imgsBanners: Srcsize = {
    xl: 'assets/img/Banner/Banner1.svg',
    l: 'assets/img/Banner/Banner1.svg',
    m: 'assets/img/Banner/Banner1.svg',
    s: 'assets/img/Banner/Banner1.svg',
  };

  constructor(
    private renderer: Renderer2,
    private userStoreService: UserStoreService,
    private _bannerService: BannerService
  ) {
    this.verifyBackendBanner();
    this.bannerSubscription = _bannerService.bannerImageData$.subscribe(
      (bannerData: any) => {
        this.images = bannerData;
        this.currentImg = this.images.xl;
      }
    );
  }

  ngOnInit(): void {
    // this.verifyBackendBanner();
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    // Preventing memory leaks
    this.bannerSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  public changeImg($event: Event) {
    const widthWindow = window.innerWidth;

    if (widthWindow <= 480) {
      this.currentImg = this.images.s;
    }

    if (widthWindow > 480 && widthWindow < 780) {
      this.currentImg = this.images.m;
    }

    if (widthWindow >= 781 && widthWindow < 1100) {
      this.currentImg = this.images.l;
      console.log('Current banner image:');
      console.log(this.currentImg);
    }

    if (widthWindow >= 1100) {
      this.currentImg = this.images.xl;
      console.log('Current banner image:');
      console.log(this.currentImg);
    }
  }

  // DragLeave Listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Drag Over');
    this.fileover = true;
  }

  // Drop Listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileover = false;
    const files = evt.dataTransfer.files;
    console.log('Drag Over');
    if (files.length > 0) {
      console.log('You droped');
    }
  }

  public fileBrowseHandler(archivo: any) {
    if (!archivo) {
      this.imageChangedEvent = null;
      return;
    }

    if (archivo) {
      this.type_fyle = archivo.target.files[0].type;
      this.prepareFilesList(archivo.target.files);
      this.showInput = false;
      this.renderer.removeClass(this.dropzone.nativeElement, 'min-dropzone');
      // this.isexpand = true;
      this.imageChangedEvent = archivo;
      const longitud = archivo.target.files[0].name.length;
      const name = archivo.target.files[0].name.split(' ');
      (this.NameFile = this.modificarname(name, longitud)),
        console.log('names files', this.NameFile);
    }
  }

  modificarname(name: any, longitud: number) {
    // tslint:disable-next-line: forin
    for (const i in name) {
      return (name[i] =
        name[i][0].toUpperCase() + name[i].substr(1, longitud - 5));
    }
  }

  imagePreview(event: ImageCroppedEvent) {
    this.croppedImage = event;
    console.log('Cropper image data');
    console.log(event);
    this._bannerService.setBannerImage(event.base64);
  }

  NoImgCropper($event) {
    this.showInput = $event.Input;
    this.showCropper = $event.cropper;
    this.isexpand = false;
    if (this.showInput === true) {
      // tslint:disable-next-line: max-line-length
      this.croppedImage = 'assets/img/Banner/Banner1.svg'; // => Acá tengo hacer una promesa y verificar si no existe un banner en el backend
    }
    console.log($event);
  }

  Close() {
    this.isOpen = !this.isOpen;
    this.showCropper = false;
    this.isexpand = false;
    this.showInput = true;
    this.ErrorImageFailed = false;
    if (this.showInput === true) {
      // tslint:disable-next-line: max-line-length
      this.croppedImage = 'assets/img/Banner/Banner1.svg'; // => Acá tengo hacer una promesa y verificar si no existe un banner en el backend
    }
  }

  ShowError($event: boolean) {
    this.ErrorImageFailed = $event;
    if (this.ErrorImageFailed === true) {
      this.showCropper = false;

      // tslint:disable-next-line: max-line-length
      this.croppedImage = 'assets/img/Banner/Banner1.svg'; // => Acá tengo hacer una promesa y verificar si no existe un banner en el backend
    }
    console.log(this.ErrorImageFailed);
  }

  SaveImgOk($event) {
    console.log('ok', $event);
    if ($event === true) {
      this.isexpand = false;
    } else {
      this.isOpen = false;
    }
  }

  DragZoneShow($event: boolean) {
    this.showInput = $event;
  }

  // **** Verificamos si existe un Banner ****//
  verifyBackendBanner() {
    this.userStoreService
      .getDataStore(localStorage.getItem('id'), localStorage.getItem('storeId'))
      .subscribe(
        (resp: StoreResponse) => {
          console.log('Banner verifiqued', resp);

          if (resp.banner_image.length === 0) {
            this._bannerService.setBannerImage(this.imgsBanners);
          } else {
            this._bannerService.setBannerImage(resp.banner_image[0].src_size);
          }
        },
        (error) => {
          this._bannerService.setBannerImage('assets/img/no-image-banner.JPG');
        }
      );
  }

  // Relcaion de progreso //

  prepareFilesList(files: Array<any>) {
    if (this.files.length >= 1) {
      this.files.splice(0, 1);
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
        console.log(this.files);
      }
    } else {
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
        console.log(this.files);
      }
    }
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.isexpand = true;
            this.showCropper = true;
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
}
