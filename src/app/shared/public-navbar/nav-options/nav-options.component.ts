import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {
  auth = false;
  constructor() { }

  ngOnInit(): void {
  }

}
