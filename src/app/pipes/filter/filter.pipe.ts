import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // Al agregar este atributo, el filtro detectara cambios en los valores recibidos de forma reactiva
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

      if (alertNotFound !== ''){
        return [{title: alertNotFound}];
      }

    }else{

      return arreglo;

    }

  }
}
