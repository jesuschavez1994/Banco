import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  // transform(arreglo: any[], texto: string, colummna: string ): any[] {


  //   if ( texto === '' ) {
  //     return arreglo;
  //   };

  //   texto = texto.toLowerCase();

  //   return arreglo.filter( items => {
  //     // includes = Si el texto incluye ese texto retorna  el arreglo
  //     return items.title.toLowerCase().includes( texto );
  //   });


  // }

  /**
   * @param  arreglo
   * Extraído de un arreglo *ngFor
   * @param texto: string
   * Valor con el que se buscan coincidencias
   * @param columna: string
   * Atributo o columna del arreglo donde se encontrara el valor a coincidir
   * @param alertNotFound: string opcional default = ""
   * Mensaje a mostrar cuando no se encuentran coincidencias
   * @returns arreglo filtrado por el atributo, a partir de un texto
   */
  transform(arreglo: any[], texto: string, columna: string, alertNotFound: string = '' ): any[] {


    if ( texto === '' ) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    arreglo = arreglo.filter( items => {
      // includes = Si el texto incluye ese texto retorna  el arreglo
      return items[columna].toLowerCase().includes( texto );
    });

    if (arreglo.length === 0) {

      return [{title: alertNotFound}];

    }else{

      return arreglo;

    }

  }

}
