import { Component, OnInit, Input, Output, EventEmitter,
    ElementRef, ViewChild } from '@angular/core';
import { StoreResponse } from '@interfaces/store.interface';
import { UserStoreService } from '@services/user-store/user-store.service';
import { base64ToFile } from '../../../../../utils/blob.utils';
import { Banner } from '@models/Banner/banner.model';
import { CropperPosition, ImageCroppedEvent, ImageTransform, Dimensions } from '@interfaces/cropper/cropper';




@Component({
  selector: 'app-cropper-img-banner',
  templateUrl: './cropper-img-banner.component.html',
  styleUrls: ['./cropper-img-banner.component.scss']
})


export class CropperImgBannerComponent implements OnInit {

    // ViewChild
    @ViewChild('imgCropper') imgCropper: ElementRef;

    // INPUTS //
    @Input() imageChangedEvent: any;
    @Input() NameFile: string;
    // Outputs //
    @Output() previewIMG = new EventEmitter<any>();
    @Output() NoCropperImg = new EventEmitter<boolean | any>();
    @Output() ErrorImage = new EventEmitter<boolean>();
    @Output() SaveSucessFull = new EventEmitter<boolean>();
    @Output() DragZoneShow = new EventEmitter<boolean>();

    // imageChangedEvent: any = '';
    croppedImage: any = '';
    showInput: boolean;
    showCropper: boolean;
    containWithinAspectRatio = true;
    scale = 1;
    imgLoaded = false;
    imgFailed = false;
    spinner = false;
    AlertSucces = false;
    ErrorAlert = false ;
    transform: ImageTransform = {};
    base64ToFileSave: ImageCroppedEvent;

    constructor(public userStoreService: UserStoreService) { }

    ngOnInit(): void {
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event, base64ToFile(event.base64));
        console.log(event.base64);
        setTimeout(() => this.previewIMG.emit(this.croppedImage), 0);
        this.base64ToFileSave = event;
    }

    imageLoaded() {
        this.imgLoaded = true;
        console.log('Img Loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Image Failed'); // => Error archivo no valido
        this.imgFailed = true;
        this.ErrorImage.emit(this.imgFailed);
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

    cambiarImg(){
        this.showInput = true;
        this.showCropper = false;
        this.NoCropperImg.emit({Input: this.showInput, cropper: this.showCropper});
    }

    save(){

        this.spinner = true;
        this.ErrorAlert = false;

        const IMG_BANNER_SAVE = new Banner(
            this.base64ToFileSave.base64,
            this.NameFile
        );

        console.log('IMG_BANNER_SAVE', IMG_BANNER_SAVE);

        this.userStoreService.SaveBanner(
            localStorage.getItem('id'),
            localStorage.getItem('storeId'),
            IMG_BANNER_SAVE
        ).subscribe( resp => {
            console.log(resp);
            this.spinner = false;
            this.AlertSucces = true;
            this.showInput = true;
            this.SaveSucessFull.emit(this.AlertSucces);
            setTimeout(() => {
                this.AlertSucces = false;
                this.SaveSucessFull.emit(this.AlertSucces);
                this.DragZoneShow.emit(this.showInput);
            }, 8000);
        }, error => {
            this.ErrorAlert = true;
            this.spinner = false;
        });
    }

}
