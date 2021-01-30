import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'boxDefault'
})
export class BoxDefaultPipe implements PipeTransform {
  transform(box: any): any {
    if (!box){
      return 'assets/img/box.svg';
    }
    const imgUrl = `${box}`;
    return imgUrl;
  }
}
