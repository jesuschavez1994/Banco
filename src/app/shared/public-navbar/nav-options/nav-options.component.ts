import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {
  @Input() auth: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
