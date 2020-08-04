import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Pelicula, RespuestaMDB} from '../../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-public-views',
  templateUrl: './public-views.component.html',
  styleUrls: ['./public-views.component.css']
})
export class PublicViewsComponent implements OnInit {

  PeliculasRecientes: Pelicula[] = [];
  producto: Pelicula [] = [];
  loading: boolean;
  oculto = 100;
  overflow = 30;


  constructor(  private themovie: ServicioService,
                private router: Router,
                private activatedRouted: ActivatedRoute) {

    this.loading = true;
    // tslint:disable-next-line: align
    this.themovie.getFeatures().subscribe( ( data: RespuestaMDB )  => {

      setTimeout(() => {
      this.PeliculasRecientes = data.results;
      console.log('Resp', this.PeliculasRecientes);
      this.loading = false;
    }, 1000);
    });
  }

  buscar(termino: string){

    this.loading = true;


    if (termino.length === 0){
      setTimeout(() => {
      this.producto = [];
      this.loading = false;
      return;
    }, 2000);
    }

    console.log(termino);

    this.themovie.buscarProducto(termino).subscribe( valor => {
      setTimeout(() => {
        this.producto = valor['results'];
        console.log('producto', this.producto);
        this.loading = false;
      }, 2000);
    });

  }

  MostrarInfo(event: any){
    console.log(event.target);
    this.oculto = 250;
  }

  ngOnInit(): void {
  }

}
