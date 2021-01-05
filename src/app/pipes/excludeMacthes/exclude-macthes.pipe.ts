import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excludeMacthes'
})
export class ExcludeMacthesPipe implements PipeTransform {

  transform(arreglo: any[], valueToMatch: any, columna: string ): any[] {

    console.log('excludeMacthes');

    switch (typeof valueToMatch) {

      case 'string':

        if ( valueToMatch === '' ) {
          return arreglo;
        }

        valueToMatch = valueToMatch.toLowerCase();

        arreglo = arreglo.filter( items => {
          // includes = Si el valueToMatch incluye ese valueToMatch retorna  el arreglo
          return items[columna].toLowerCase() !== valueToMatch;
        });

        break;

      default:

        arreglo = arreglo.filter( items => {
          // includes = Si el valueToMatch incluye ese valueToMatch retorna  el arreglo
          return items[columna] !== valueToMatch;
        });

        break;

    }

    console.log(arreglo);
    return arreglo;

  }

}
