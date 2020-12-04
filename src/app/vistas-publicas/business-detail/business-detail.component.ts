import { Component, OnInit } from '@angular/core';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {


  sidebarListCtr = new SidebarListControler();

  constructor() {
    this.sidebarListCtr.expandSidebarlist = true;
  }

  ngOnInit(): void {
  }

}
