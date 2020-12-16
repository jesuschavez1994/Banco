import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() buttonSidebarList = false;
  @Input() sidebarTarget: SidebarListComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
