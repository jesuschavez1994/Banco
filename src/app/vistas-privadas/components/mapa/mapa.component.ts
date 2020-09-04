import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapEditarComponent } from '../map-editar/map-editar.component';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [] ;
  // tslint:disable-next-line: variable-name
  @Output() adrees_mapa: EventEmitter<Marcador>;

  latitud = -33.4372;
  longitud = -70.6506;

  lat: number;
  lng: number;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {

    this.adrees_mapa = new EventEmitter();

    if ( localStorage.getItem('marcadores' )){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcadores( event: any ){
    console.log(event);
    const coords: { lat: number, lng: number } = event.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();
    this.adrees_mapa.emit(nuevoMarcador);
    this.snackBar.open('Marcador agregado', 'cerrar', { duration: 3000 });
  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number){
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador){

    const dialogRef = this.dialog.open(MapEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if ( !result ){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'cerrar', { duration: 3000 });

    });

  }


}

