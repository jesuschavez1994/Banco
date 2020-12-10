import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform( value: number, format: string = 'de-DE', currency: string = '' ): any {

    console.log('el pipe format number funciona', value);

    return currency + new Intl.NumberFormat( format ).format( value );
  }

}
