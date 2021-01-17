import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {
  userLog = false;
  constructor() { }

  ngOnInit(): void {
  }

}
