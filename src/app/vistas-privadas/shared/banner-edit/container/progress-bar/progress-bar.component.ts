import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, DoCheck {

  @Input() progress: number = 0;
  @Output() ProgressFinally = new EventEmitter<any>();

  constructor(){}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.ProgressFinally.emit(this.ProgressFinally);
  }

}
