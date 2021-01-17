import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-failed-message',
  templateUrl: './error-failed-message.component.html',
  styleUrls: ['./error-failed-message.component.scss']
})
export class ErrorFailedMessageComponent implements OnInit {

  @Input() ErrorMessage: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
