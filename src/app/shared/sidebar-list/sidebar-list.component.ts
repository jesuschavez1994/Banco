import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit {

  @ViewChild('sidebarList') sidebarList: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSideBar() {
    this.sidebarList.nativeElement.classList.toggle( 'aside--expanded' );

  }

}
