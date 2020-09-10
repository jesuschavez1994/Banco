import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { URL_SERVICIOS } from '../config/config';
import { UsuarioService } from '../services/usuario/usuario.service';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(public usuarioService: UsuarioService){}

  transform(img: string): string {


    if (!img){
       return '../../assets/img/avatar.svg';
    }

    if (img.indexOf('https') >= 0){
      return img;
    }

    const imgUrl = `${URL}/${img}`;
    return imgUrl;
  }

}
