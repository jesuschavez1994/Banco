import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.css']
})
export class NavOptionsComponent implements OnInit {
  auth = true;
  constructor() { }

  ngOnInit(): void {
  }

}
