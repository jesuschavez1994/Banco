import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imgFallback'
})
export class ImgFallbackPipe implements PipeTransform {

  transform(img: string, target: string = 'default', element? ): string {

    let imgDefault;

    switch (target) {

      case 'default':
        imgDefault = 'assets/img/no-image-banner.jpg';
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

    if (!img){

      return imgDefault;

    }

    // element.onerror = () => {

    //   if (element.src !== imgDefault) {
    //     element.src = imgDefault;
    //   }
    // };

    // console.log('element', element);

    return `${URL}/${img}`;

  }

}
