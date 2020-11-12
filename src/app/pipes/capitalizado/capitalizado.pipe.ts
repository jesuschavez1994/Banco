import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  transform(value: string, todas: boolean = true): string {
    value = value.toLocaleLowerCase();
    // tslint:disable-next-line: prefer-const
    let descripcion = value.split(' ');

    if ( todas ){
        // tslint:disable-next-line: forin
        for ( let i in descripcion){
            descripcion[i] = descripcion[i][0].toUpperCase() + descripcion[i].substr(1);
        }
    }else{
        descripcion[0] = descripcion[0][0].toUpperCase() + descripcion[0].substr(1);
    }

    return descripcion.join(' ');
  }

}
