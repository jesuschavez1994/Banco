import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent implements OnInit {
  @Input() userLog: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
