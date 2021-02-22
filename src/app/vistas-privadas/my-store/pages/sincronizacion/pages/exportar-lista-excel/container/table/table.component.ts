import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() Listado: any;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
    console.log('List', this.Listado);
  }

  ShowList(event){

  }

}
