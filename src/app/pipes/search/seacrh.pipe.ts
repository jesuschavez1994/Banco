import { Pipe, PipeTransform } from '@angular/core';
import { Descripcion, Total } from '../../interfaces/sincronizacion';
import { SincronizacionService } from '../../services/sincronizacion/sincronizacion.service';
import { Termino } from '../../models/buscador.model';

@Pipe({
  name: 'seacrh'
})

export class SeacrhPipe implements PipeTransform {

  palabra: any;

  constructor(public sincronizacion: SincronizacionService){}

  transform(lista: Descripcion[], texto: string): any[] {

    if(!texto){
      return lista
    }

    if (texto !== null){

      let comparacion = new Termino( texto  );

      this.sincronizacion.BuscadorSugerencias(
        comparacion,
        localStorage.getItem('id'),
        localStorage.getItem('storeId')).subscribe( (resp: Total) => {
        console.log(resp.data);
        return  this.palabra = resp.data;
      });

      return lista.filter(item => item.name);

    }

  }
    

}

