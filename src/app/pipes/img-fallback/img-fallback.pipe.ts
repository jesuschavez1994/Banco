import { Pipe, PipeTransform, ElementRef } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'imgFallback'
})
export class ImgFallbackPipe implements PipeTransform {

  transform(img: string, target: string = 'default', element?: ElementRef ): string {

    let imgDefault;

    switch (target) {

      case 'default':
        imgDefault = 'assets/img/no-image-banner.jpg';
        break;
      case 'banner-medick':
        imgDefault = 'assets/img/Banner/Banner1.svg';
        break;
      case 'box':
        imgDefault = 'assets/img/Box/box.svg';
        break;
      case 'avatar':
        imgDefault = 'assets/img/no-avatar.jpg';
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

    if (!img){

      return imgDefault;

    }

    return `${URL}/${img}`;

  }

}
