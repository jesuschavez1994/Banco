import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-size-file',
  templateUrl: './size-file.component.html',
  styleUrls: ['./size-file.component.scss']
})
export class SizeFileComponent implements OnInit {

  @Input() file: any;
  @Output() ProgressBar = new EventEmitter<number>();
  @Output() LoadFinally = new EventEmitter<boolean>();

  FileComplete = true;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */

  formatBytes(bytes, decimals ?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public ProgressFinally($event){
    this.LoadFinally.emit($event);
  }


}
