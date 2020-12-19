import { Component, Input, OnInit } from '@angular/core';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumb: BreadcrumbOptions[];

  constructor() { }

  ngOnInit(): void {
  }

}
