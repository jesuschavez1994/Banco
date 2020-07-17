import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Pelicula } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // producto: Pelicula [] = [];

  constructor(private buscarProducto: ServicioService) { }

  ngOnInit(): void {
  }

  // buscar(termino: string){

  //   console.log(termino);
  //   this.buscarProducto.buscarProducto(termino).subscribe( valor => {
  //     this.producto = valor['results'];
  //     console.log(this.producto);
  //   });

  // }

}
