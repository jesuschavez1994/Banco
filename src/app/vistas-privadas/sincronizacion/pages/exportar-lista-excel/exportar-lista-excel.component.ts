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
  public filesToUpload: Array<File>;

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

  onFileChange(fileInput: any){
    console.log(fileInput);
    return this.filesToUpload = (fileInput.target.files as Array<File>);
    console.log(this.filesToUpload);
  }

  enviarExcel(){

    // const file = new DocumentExcel(
    //   this.forma.value.file,
    // );

    console.log(this.forma.value.file);
    console.log('FILESSS', this.filesToUpload[0]);

    this.sincronizacion.PostListadoProductosExcel(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.filesToUpload[0]).subscribe( response => {
      console.log(response);
    });
  }

}
