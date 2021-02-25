import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MyValidators } from '@utils/validators';
import { DocumentExcel } from '@models/sincronizacion/documentExcel.model';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { FileUploadModel } from '@interfaces/UploadFiles';
import { HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../../../../config/config';
import { NgxSpinnerService } from "ngx-spinner";


const URL = URL_SERVICIOS;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { utf8Encode } from '@angular/compiler/src/util';

import {ActivatedRoute, Params, Router} from '@angular/router';

class Contact {
  cantidad = '';
  Nombre = '';
  Descripcion = '';
  Precio = '';
  Marca = '';
}




@Component({
  selector: 'app-exportar-lista-excel',
  templateUrl: './exportar-lista-excel.component.html',
  styleUrls: ['./exportar-lista-excel.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportarListaExcelComponent implements OnInit {


  forma: FormGroup;
  public filesToUpload: Array<File>;
  param = 'file';
  Data = [];
  archivo: any;

  importContacts: any[] = [];
  exportContacts: Contact[] = [];
  dowloadExcel: boolean;
  ShowLista: any[];
  path: any;
  userId: string;
  storeId: string;
  ProgressBarFull: number;
  FileCompletedLoad: number;

  // VARIABLES PAGINADOR //
  data = [];
  pagesActual = 1;
  total = 0;
  perPage = 10;

  // Open drog //
  isOpen = false;


  constructor(private sincronizacion: SincronizacionService,
              // tslint:disable-next-line: variable-name
              private _cd: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService
              // tslint:disable-next-line: variable-name
              ) {

    this.forma = new FormGroup({
      file: new FormControl(''),
    });

   }

   private files: Array<FileUploadModel> = [];

  ngOnInit() {
    console.log(this.forma);
    this.spinner();

    this.userId = localStorage.getItem('id'),
    this.storeId = localStorage.getItem('storeId');
    this.path = URL_SERVICIOS + `/api/users/${this.userId }/stores/${this.storeId}/dowload_productcsv`;
    console.log(this.path);

    this.sincronizacion.DowloadFileExcelListProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId')
    ).subscribe(
      (response: any) => {
        this.spinnerService.hide();
        console.log(response);
        if ( response.size > 1){
          this.dowloadExcel = true;
          console.log(this.dowloadExcel);
        }else{
          return this.dowloadExcel = false;
        }
      }, error => {
        this.spinnerService.hide();
      }
    );

    

  }

  spinner(): void{
    this.spinnerService.show();
  }

  CloseOverlay($event){
    console.log($event);
    this.isOpen = $event;
  }


  ExistsFile($event){
    console.log('Exists', $event);
    this.archivo = $event;
  }

  DataListExcel($event){
    this.Data = $event;
    console.log('DataEvent', $event);
  }

  exportData(tableId: string) {
    this.sincronizacion.exportToFile('contacts', tableId);
  }

  enviarExcel(){

    this.spinner();

    const file = new DocumentExcel(
      this.archivo
    );

    console.log('Archivo', file);

    this.sincronizacion.PostListadoProductosExcel(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      file).subscribe( response => {
      console.log(response);
      this.spinnerService.hide();
    });

  }

  ProgressBar($event){
    this.ProgressBarFull = $event;
  }

  FileCompleted($event){
    // this.FileCompletedLoad = $event;
    // console.log('carga completada', $event);
  }


}
