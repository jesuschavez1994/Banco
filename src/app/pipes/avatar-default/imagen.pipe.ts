import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'avatarDefault'
})
export class ImagenPipe implements PipeTransform {


  transform(img: any): string {

    let imgDefault;

    if (!img) {
       return imgDefault = 'assets/img/avatar.svg';
    }

    if (img.indexOf('https') >= 0){
      return img;
    }

    const imgUrl = `${URL}/${img}`;
    return imgUrl;
  }

}
