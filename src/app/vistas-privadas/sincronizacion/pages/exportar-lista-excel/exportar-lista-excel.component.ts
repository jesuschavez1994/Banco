import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MyValidators } from '@utils/validators';
import { DocumentExcel } from '@models/sincronizacion/documentExcel.model';
import { SincronizacionService } from '../../../../services/sincronizacion/sincronizacion.service';
import { FileUploadModel } from '../../../../interfaces/UploadFiles';
import { HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../../config/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

class Contact {
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
}


@Component({
  selector: 'app-exportar-lista-excel',
  templateUrl: './exportar-lista-excel.component.html',
  styleUrls: ['./exportar-lista-excel.component.css']
})
export class ExportarListaExcelComponent implements OnInit {

  forma: FormGroup;
  public filesToUpload: Array<File>;
  param: string = 'file';

  archivo: any;

  importContacts: Contact[] = [];
  exportContacts: Contact[] = [];


  constructor(private sincronizacion: SincronizacionService,
              // tslint:disable-next-line: variable-name
              private _cd: ChangeDetectorRef,
              // tslint:disable-next-line: variable-name
              ) {

    this.forma = new FormGroup({
      file: new FormControl(''),
    });

   }

   private files: Array<FileUploadModel> = [];

  ngOnInit(): void {
  }

  SendDocumentExcel(){}

  onFileChange(evt: any){
    console.log(evt);
    const target: DataTransfer = (evt.target) as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      let base64data = reader.result;
      console.log(base64data);

      const bstr: string = e.target.result;
      this.archivo = bstr;
      console.log('EXCEL', bstr);
      const data = this.sincronizacion.importFromFile(bstr) as any[];
      console.log('Data', data);
      const header: string[] = Object.getOwnPropertyNames(new Contact());
      const importedData = data.slice(1, -1);


      this.importContacts = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return obj as Contact;
      });

    };

    reader.readAsBinaryString(target.files[0]);

    console.log('BINARIO', reader.readAsBinaryString(target.files[0]));
    // console.log(fileInput);
    // this.filesToUpload = (fileInput.target.files as Array<File>);
    // console.log(this.filesToUpload);

  }

  exportData(tableId: string) {
    this.sincronizacion.exportToFile("contacts", tableId);
  }

  enviarExcel(){

    const file = new DocumentExcel(
      this.archivo
    );

    console.log('Archivo', file);
    // console.log('FILESSS', this.filesToUpload[0]);

    this.sincronizacion.PostListadoProductosExcel(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      file).subscribe( response => {
      console.log(response);
    });

    // const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

    // fileUpload.onchange = () => {
    //   // tslint:disable-next-line: prefer-for-of
    //   for ( let index = 0; index < fileUpload.files.length; index++){
    //     const file = fileUpload.files[index];
    //     this.files.push({
    //       data: file,
    //       state: 'in',
    //       inProgress: false,
    //       progresss: 0,
    //       canRetry: false,
    //       canCancel: true
    //     });
    //   }

    //   console.log(this.files);

    //   this.uploadFiles();

    // };

    // fileUpload.click();
  }

  // private uploadFiles(){
  //   const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
  //   fileUpload.value = '';

  //   this.files.forEach(file => {
  //     this.uploadFile(file);
  //   });
  // }

  // private uploadFile(archivo: FileUploadModel){
  //   const file = new FormData();
  //   file.append(this.param, archivo.data);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data',
  //   });

  //   console.log(file);

  //   const req = new HttpRequest('POST',
  //                                URL_SERVICIOS + `/api/users/${localStorage.getItem('id')}/stores/${localStorage.getItem('storeId')}/productcsv`,
  //                               file, {
  //                                 headers,
  //                                 reportProgress: true
  //   });

  //   archivo.inProgress = true;

  //   archivo.sub = this._http.request(req).pipe(
  //     map( event => {
  //         switch (event.type){
  //           case HttpEventType.UploadProgress:
  //               archivo.progresss = Math.round(event.loaded * 100 / event.total);
  //               break;
  //           case HttpEventType.Response:
  //             return event;
  //         }
  //     }), tap(message => {}),
  //     last(),
  //     catchError((error: HttpErrorResponse) => {
  //       archivo.inProgress = false;
  //       archivo.canRetry = true;
  //       return of( `${archivo.data.name} upload failed.`);
  //     })
  //   ).subscribe(
  //     (event: any ) => {
  //       console.log(event);
  //       if (typeof (event) === 'object'){
  //         console.log(event);
  //       }
  //     }
  //   );
  // }

}
