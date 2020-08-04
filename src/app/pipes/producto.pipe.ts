import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = 'https://image.tmdb.org/t/p';
@Pipe({
  name: 'producto'
})
export class ProductoPipe implements PipeTransform {

  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.j

  transform(img: string, size: string ="w500"): string {

    const imgUrl = `${URL}/${size}/${img}`;
    return imgUrl;
  }
}
