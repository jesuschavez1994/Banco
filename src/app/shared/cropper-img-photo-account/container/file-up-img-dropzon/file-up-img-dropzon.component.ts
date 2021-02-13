import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-up-img-dropzon',
  templateUrl: './file-up-img-dropzon.component.html',
  styleUrls: ['./file-up-img-dropzon.component.scss']
})
export class FileUpImgDropzonComponent implements OnInit {

  @Input()  showInput: boolean;
  @Output() FileUpload = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public fileBrowseHandler(archivo: any){
    this.FileUpload.emit(archivo);
  }

}
