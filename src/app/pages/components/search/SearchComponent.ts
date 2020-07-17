import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';

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

}
