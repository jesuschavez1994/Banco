import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arreglo: any[], valueToMatch: any, columna: string, alertNotFound: string = '' ): any[] {

    switch (typeof valueToMatch) {

      case 'string':

        if ( valueToMatch === '' ) {
          return arreglo;
        }

        valueToMatch = valueToMatch.toLowerCase();

        arreglo = arreglo.filter( items => {
          // includes = Si el valueToMatch incluye ese valueToMatch retorna  el arreglo
          return items[columna].toLowerCase() === valueToMatch;
        });

        break;

      default:

        arreglo = arreglo.filter( items => {
          // includes = Si el valueToMatch incluye ese valueToMatch retorna  el arreglo
          return items[columna] === valueToMatch;
        });

        break;

    }

    if (arreglo.length === 0) {

      return [{title: alertNotFound}];

    }else{

      return arreglo;

    }

  }
}
