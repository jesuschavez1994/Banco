import { Component, OnInit, Input, Output, EventEmitter, DoCheck  } from '@angular/core';

@Component({
  selector: 'app-progess-bar-file-excel',
  templateUrl: './progess-bar-file-excel.component.html',
  styleUrls: ['./progess-bar-file-excel.component.scss']
})
export class ProgessBarFileExcelComponent implements OnInit, DoCheck {

  @Input() progress: number = 0;
  @Output() ProgressFinally = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.ProgressFinally.emit(this.ProgressFinally);
  }

}
