import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

const URL = URL_SERVICIOS;

@Pipe({
  name: 'LimitarTexto'
})
export class LimitarTextoPipe implements PipeTransform {

  transform(text: string, maxLength: number): string {

    const textLength = text.length;

    return textLength > maxLength ? text.substr(0, maxLength) + '...' : text;

  }

}
