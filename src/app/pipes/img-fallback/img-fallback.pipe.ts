import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imgFallback'
})
export class ImgFallbackPipe implements PipeTransform {

  transform(img: string, target: string = 'default' ): string {

    if (!img){

      switch (target) {

        case 'default':
          return 'assets/img/no-image-banner.jpg';

        case 'box':
          return 'assets/img/Box/box.svg';

        case 'avatar':
          return 'assets/img/no-avatar.jpg';
        default:
          return 'assets/img/no-image-banner.jpg';

      }

    }

    return `${URL}/${img}`;

  }

}
