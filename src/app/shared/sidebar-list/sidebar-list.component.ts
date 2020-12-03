import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit {

  @Input() isExpanded = false;
  @Output() sidebarExpand = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  // public toggleSideBar() {
  //   this.isExpanded = this.isExpanded ? false : true ;

  // }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

}
