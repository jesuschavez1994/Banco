import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'LimitarTexto'
})
export class LimitarTextoPipe implements PipeTransform {

  transform(text: string): string {

    const logitud = 90;
    const dato = text;
    let datoAMostrar = '';

    for (let i = 0; i < logitud && i < dato.length; i++) {
        datoAMostrar = datoAMostrar + dato[i];
    }

    datoAMostrar = datoAMostrar;

    return datoAMostrar;
  }

}
