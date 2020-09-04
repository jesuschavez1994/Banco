import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-map-editar',
  templateUrl: './map-editar.component.html',
  styleUrls: ['./map-editar.component.css']
})
export class MapEditarComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<MapEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);

      this.forma = new FormGroup({
        titulo: new FormControl(data.titulo),
        desc: new FormControl(data.desc),
      });
    }

  ngOnInit(): void {
  }

  guardarCambios(){
    console.log(this.forma.value);
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formEditMapa(){

  }

}
