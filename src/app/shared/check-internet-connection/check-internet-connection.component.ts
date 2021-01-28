import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check-internet-connection',
  templateUrl: './check-internet-connection.component.html',
  styleUrls: ['./check-internet-connection.component.scss']
})
export class CheckInternetConnectionComponent implements OnInit {

  HiddenAlert = false;

  @Input() hasNetworkConnection: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.HiddenAlert = true;
  }

}
