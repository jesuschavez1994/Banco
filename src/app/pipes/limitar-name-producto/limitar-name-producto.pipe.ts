import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'LimitarNameProducto'
})
export class LimitarNameProductoPipe implements PipeTransform {

  transform(name: string): string {

    const logitud = 55;
    const dato = name;
    let datoAMostrar = '';

    for (let i = 0; i < logitud && i < dato.length; i++) {
        datoAMostrar = datoAMostrar + dato[i];
    }

    datoAMostrar = datoAMostrar;

    return datoAMostrar;
  }

}
