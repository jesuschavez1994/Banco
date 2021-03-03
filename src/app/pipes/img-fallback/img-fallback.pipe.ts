import { Pipe, PipeTransform, ElementRef } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'imgFallback',
})
export class ImgFallbackPipe implements PipeTransform {
  transform(
    img: string,
    target: string = 'default',
    element?: ElementRef
  ): string {
    let imgDefault;

    switch (target) {
      case 'default':
        imgDefault = 'assets/img/no-image-banner.jpg';
        break;
      case 'banner': {
        imgDefault = 'assets/img/no-image-banner.jpg';
        let image = '';
        !img
          ? (image = this.useDefaultImg(imgDefault))
          : (image = this.formatImage(img));
        return image;
      }
      case 'banner-medick':
        imgDefault = 'assets/img/Banner/Banner1.svg';
        break;
      case 'box':
        imgDefault = 'assets/img/Box/box.svg';
        break;
      case 'avatar':
        imgDefault = 'assets/img/no-avatar.jpg';
        break;
      case 'avatar-hombre':
        imgDefault = 'assets/img/avatar-hombre.jpg';
        break;
      default:
        imgDefault = 'assets/img/no-image-banner.jpg';
        break;
    }

    // if (element){

    //   element.nativeElement.onerror = () => {

    //     if (element.nativeElement.src !== imgDefault) {
    //       // element.nativeElement.src = imgDefault;
    //       console.log(element.nativeElement.src, imgDefault);
    //     }
    //   };

    //   console.log('element', element);
    // }

    if (!img) {
      return imgDefault;
    }

    return `${URL}/${img}`;
  }

  // Logic in case we're dealing with base64 encrypted images.
  private useDefaultImg(defaultImage: string): string {
    return defaultImage;
  }

  private formatImage(imageData: string): string {
    // If the image is encrypted with base64, we return the image as is.
    if (imageData.slice(0, 4).indexOf('data:') >= 0) {
      return `${imageData}`;
    } else {
      return `${URL}/${imageData}`;
    }
  }
}
