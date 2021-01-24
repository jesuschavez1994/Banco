import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-sidebar-list-button',
  templateUrl: './sidebar-list-button.component.html',
  styleUrls: ['./sidebar-list-button.component.scss']
})
export class SidebarListButtonComponent implements OnInit {

  @Input() expand = false;
  @Output() isExpanded = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  public toggleSideBar() {
    this.expand = this.expand ? false : true;
    this.isExpanded.emit(this.expand);
  }

}
