import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-list-button',
  templateUrl: './sidebar-list-button.component.html',
  styleUrls: ['./sidebar-list-button.component.scss']
})
export class SidebarListButtonComponent implements OnInit {

  @Input() isExpanded = false;
  @Output() sidebarExpand = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSideBar() {
    this.isExpanded = this.isExpanded ? false : true ;
    this.sidebarExpand.emit( this.isExpanded );
  }

}
