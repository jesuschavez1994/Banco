import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-business-contact',
  templateUrl: './business-contact.component.html',
  styleUrls: ['./business-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
