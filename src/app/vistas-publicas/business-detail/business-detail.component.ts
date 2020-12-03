import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

  expandSidebarlist = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebarList(event){
    this.expandSidebarlist = event;
  }

}
