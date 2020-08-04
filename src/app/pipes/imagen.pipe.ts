import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = 'https://image.tmdb.org/t/p';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.j

  transform(img: string, size: string ="w500"): string {
    // if (!img){
    //   return '../../assets/img/no-image-banner.jpg';
    // }
    const imgUrl = `${URL}/${size}/${img}`;
    return imgUrl;
  }

}
