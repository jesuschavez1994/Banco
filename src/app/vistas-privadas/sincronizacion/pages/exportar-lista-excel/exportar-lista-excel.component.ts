import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MyValidators } from '@utils/validators';
import { DocumentExcel } from '@models/sincronizacion/documentExcel.model';
import { SincronizacionService } from '../../../../services/sincronizacion/sincronizacion.service';

@Component({
  selector: 'app-exportar-lista-excel',
  templateUrl: './exportar-lista-excel.component.html',
  styleUrls: ['./exportar-lista-excel.component.css']
})
export class ExportarListaExcelComponent implements OnInit {

  forma: FormGroup;

  constructor(private sincronizacion: SincronizacionService,
              // tslint:disable-next-line: variable-name
              private _cd: ChangeDetectorRef) {

    this.forma = new FormGroup({
      file: new FormControl(''),
    });

   }

  ngOnInit(): void {
  }

  SendDocumentExcel(){}

  enviarExcel(){

    const file = new DocumentExcel(
      this.forma.value.file,
    );

    console.log(this.forma.value.file);

    this.sincronizacion.PostListadoProductosExcel(localStorage.getItem('id'), file).subscribe( response => {
      console.log(response);
    });
  }

}
