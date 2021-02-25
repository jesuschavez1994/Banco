import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Items } from '@models/dataListExcel/dataListExcel.model';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { DocumentExcel } from '@models/sincronizacion/documentExcel.model';
import { SizeFileComponent } from '../size-file/size-file.component';

@Component({
  selector: 'app-drag-drop-zone-file',
  templateUrl: './drag-drop-zone-file.component.html',
  styleUrls: ['./drag-drop-zone-file.component.scss']
})

export class DragDropZoneFileComponent implements OnInit {

  showInput = true;
  Data = [];
  DataExcel = [];
  importContacts: any[] = [];
  archivo: any;
  files: any[] = [];
  FileComplete = true;

  // Input //
  @Input() EstateisOpen: boolean;
  @Input() SpinnerShow: boolean;
  @Input() SaveFile: boolean;
  @Input() Hiden: boolean;
  @Input() ErrorMessage: boolean;

  // Output //
  @Output() CloseOverlay = new EventEmitter<boolean>();
  @Output() ExistsFile = new EventEmitter<any>();
  @Output() DataListExcel = new EventEmitter<any>();
  @Output() ProgressBar = new EventEmitter<number>();
  @Output() FileCompleted = new EventEmitter<boolean>();

  // ViewChild//
  @ViewChild('ProgressFilee') ProgressFilee: SizeFileComponent;

  constructor(  private _cd: ChangeDetectorRef,
                private sincronizacion: SincronizacionService
              ) { }

  ngOnInit(): void {
  }

  Close(){
    this.EstateisOpen = !this.EstateisOpen;
    this.CloseOverlay.emit(this.EstateisOpen);
  }

  fileBrowseHandler(evt: any){

    // console.log('Event', evt);

    if (evt){
      this.prepareFilesList(evt.target.files);
      this.showInput = false;
    }
    // Aqui desciframos lo que contiene la tabla excel
    const target: DataTransfer = (evt.target) as DataTransfer;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data =  this.sincronizacion.ShowTableExcell(bstr) as any[];
      // console.log('ARRAY', data.length);
      const header: string[] = Object.getOwnPropertyNames(new Items());
      // console.log('HEADERS', header);
      const importedData = data.slice(1, -1);
      // console.log('slice', importedData);
      this.importContacts = importedData.map(arr => {
        // console.log(arr);
        // debugger;
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
          // debugger;
        }
        // console.log('obj', obj);
        // console.log('Data', this.Data);
        this.DataListExcel.emit(this.Data);
        return this.Data.push(obj as Items);
      });


    };
    reader.readAsBinaryString(target.files[0]);


    // Aquí Envio el Documento Excel en base64
    const readerImport = new FileReader();
    // console.log(evt);
    if (evt.target.files && evt.target.files.length) {
      const [file] = evt.target.files;
      readerImport.readAsDataURL(file);

      readerImport.onload = (e: any) => {

        const bstr: string = e.target.result;
        // console.log('EXCEL', bstr);
        const data = this.sincronizacion.importFromFile(bstr) as any;
        const header: string[] = Object.getOwnPropertyNames(new Items());
        // console.log('Data', data);
        const importedData = data.slice(1, -1);
        // console.log(header);

        this.importContacts = importedData.map(arr => {
          const obj = {};
          for (let i = 0; i < header.length; i++) {
            const k = header[i];
            obj[k] = arr[i];
          }
          return obj as Items;
        });

        this.archivo = readerImport.result;
        this.ExistsFile.emit(this.archivo);
        // console.log('FILESSS', this.archivo);
        // console.log('file', this.forma.value.file);
        this._cd.markForCheck();
      };
    }

  }

  // Relcaion de progreso //

  prepareFilesList(files: Array<any>) {

    if (this.files.length >= 1){
      this.files.splice(0, 1);
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
        console.log(this.files);
      }
    }else{
      for (const item of files) {
        item.progress = 0;
        this.files.push(item);
        console.log(this.files);
      }
    }
    this.uploadFilesSimulator(0);

  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
            console.log()
          }
        }, 200);
      }
    }, 1000);
  }

  ProgressFinally($event, progress){
    console.log('Progress', progress);
    this.ProgressBar.emit(progress);
    if (progress === 100){
      
    }

  }

  public LoadFinally(event){
    // setTimeout(() => {
    //   this.FileCompleted.emit(event);
    // }, 0);
  }


}
