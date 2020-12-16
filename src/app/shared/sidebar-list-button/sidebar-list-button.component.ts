import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SidebarListComponent } from '../sidebar-list/sidebar-list.component';

@Component({
  selector: 'app-sidebar-list-button',
  templateUrl: './sidebar-list-button.component.html',
  styleUrls: ['./sidebar-list-button.component.scss']
})
export class SidebarListButtonComponent implements OnInit {

  @Input() sidebarTarget: SidebarListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSideBar() {
    this.sidebarTarget.isExpanded = this.sidebarTarget.isExpanded ? false : true ;

  }

}
