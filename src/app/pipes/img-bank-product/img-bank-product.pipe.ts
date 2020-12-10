import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'imgBankProduct'
})
export class ImgBankProductPipe implements PipeTransform {
  transform(img: string): string {
    if (!img){
      return 'assets/img/Box/box.svg';
    }
    const imgUrl = `${URL}/${img}`;
    return imgUrl;
  }
}
