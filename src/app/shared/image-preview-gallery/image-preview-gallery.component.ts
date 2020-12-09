import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Component({
  selector: 'app-image-preview-gallery',
  templateUrl: './image-preview-gallery.component.html',
  styleUrls: ['./image-preview-gallery.component.scss']
})
export class ImagePreviewGalleryComponent implements OnInit, AfterViewInit {

  @Input() imgs: string[];
  @Input() sync: any;
  currentImg: string;

  @ViewChild('image') imageContainer: ElementRef;
  @ViewChild('zoom') zoomContainer: ElementRef;
  @ViewChild('zoomImage') zoomImage: ElementRef;

  constructor() {}

  ngOnInit(): void {
    console.log('FFFFF', this.imgs)
    this.currentImg = this.imgs[0];
    console.log('CURRENTIMG', this.currentImg)

  }

  ngAfterViewInit(): void {
    this.imageZoom();

  }

  public selectImg( imgSelected ) {
    this.currentImg = imgSelected;
    this.imageZoom();
  }

  public imageZoom() {
    // use your mousewheel to zoom in 🔍

    // console.clear();

    // const image = document.querySelectorAll('.image')[0];
    // const zoom = document.querySelectorAll('.zoom')[0];
    // const zoomImage = document.querySelectorAll('.zoom-image')[0];

    const image = this.imageContainer.nativeElement;
    const zoom = this.zoomContainer.nativeElement;
    const zoomImage = this.zoomImage.nativeElement;

    let clearSrc;
    let zoomLevel = 2;

    const images = [
      {
        thumb: this.currentImg,
        hires: this.currentImg
      }, {
        thumb: this.currentImg,
        hires: this.currentImg
      }, {
        thumb: this.currentImg,
        hires: this.currentImg
      }, {
        thumb: this.currentImg,
        hires: this.currentImg
      }, {
        thumb: this.currentImg,
        hires: this.currentImg
      },
    ];

    // set to random image
    let img = images[Math.floor(Math.random() * images.length)];

    switch(this.sync){
      case "sync":
      image.getElementsByTagName('a')[0].setAttribute('href', `${URL}/${img.hires}`);
      image.getElementsByTagName('img')[0].setAttribute('src', `${URL}/${img.thumb}`);
      break;
      default:
      image.getElementsByTagName('a')[0].setAttribute('href', img.hires);
      image.getElementsByTagName('img')[0].setAttribute('src', img.thumb);
    }

    // image.getElementsByTagName('a')[0].setAttribute('href', img.hires);
    // image.getElementsByTagName('img')[0].setAttribute('src', img.thumb);

    const preloadImage = url => {
      let img = new Image();
      img.src = url;
    };

    preloadImage(img.hires);



    const enterImage = function(e) {
      zoom.classList.add('show', 'loading');
      clearTimeout(clearSrc);

      let posX, posY, touch = false;

      if (e.touches) {
        posX = e.touches[0].clientX;
        posY = e.touches[0].clientY;
        touch = true;
      } else {
        posX = e.clientX;
        posY = e.clientY;
      }

      // touch
      //   ? zoom.style.top = `${posY - zoom.offsetHeight / 0}px`
      //   : zoom.style.top = `${posY - zoom.offsetHeight / 0.25}px`;
      // zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

      touch
        ? zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`
        : zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;
      zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

      let originalImage = this.getElementsByTagName('a')[0].getAttribute('href');

      zoomImage.setAttribute('src', originalImage);

      // remove the loading class
      zoomImage.onload = function() {
        console.log('hires image loaded!');
        setTimeout(() => {
          zoom.classList.remove('loading');
        }, 500);
      };

      zoom.style.transform = `scale(${zoomLevel})`;
    };


    const leaveImage = function() {
      // remove scaling to prevent non-transition
      zoom.style.transform = null;
      zoomLevel = 2;
      zoom.classList.remove('show');
      clearSrc = setTimeout(() => {
                  zoomImage.setAttribute('src', '');
                }, 250);
    };


    const move = function(e) {
      e.preventDefault();

      let posX, posY, touch = false;

      if (e.touches) {
        posX = e.touches[0].clientX;
        posY = e.touches[0].clientY;
        touch = true;
      } else {
        posX = e.clientX;
        posY = e.clientY;
      }

      // move the zoom a little bit up on mobile (because of your fat fingers :<)
      // touch
      //   ? zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`
      //   : zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;
      // zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

      touch
        ? zoom.style.top = `${posY - zoom.offsetHeight + 450}px`
        : zoom.style.top = `${posY - zoom.offsetHeight + 400}px`;
      zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;

      console.log('Zoom zoomLeft and top');
      console.log(zoom.style.top);
      console.log(`${posX - zoom.offsetWidth / 1}px`);

      const percX = (posX - this.offsetLeft) / this.offsetWidth;
      const percY = (posY - this.offsetTop) / this.offsetHeight;

      // Original
      const zoomLeft = -percX * zoomImage.offsetWidth + (zoom.offsetWidth / 2);
      const zoomTop = -percY * zoomImage.offsetHeight + (zoom.offsetHeight / 2);

      // let zoomLeft = -percX * zoomImage.offsetWidth + (zoom.offsetWidth / 2),
      // zoomTop = -percY * zoomImage.offsetHeight + (zoom.offsetHeight / 14);

      zoomImage.style.left = `${zoomLeft}px`;
      zoomImage.style.top = `${zoomTop - 150}px`;

      console.log('ZoomImage zoomLeft and top');
      console.log(zoomImage.style.left);
      console.log( zoomImage.style.top);
    };



    image.addEventListener('mouseover', enterImage);
    image.addEventListener('touchstart', enterImage);

    image.addEventListener('mouseout', leaveImage);
    image.addEventListener('touchend', leaveImage);

    image.addEventListener('mousemove', move);
    image.addEventListener('touchmove', move);


    image.addEventListener('wheel', e => {
      e.preventDefault();
      e.deltaY > 0 ? zoomLevel-- : zoomLevel++;

      if (zoomLevel < 1) { zoomLevel = 1; }
      if (zoomLevel > 5) { zoomLevel = 5; }

      console.log(`zoom level: ${zoomLevel}`);
      zoom.style.transform = `scale(${zoomLevel})`;
    });
  }

}
