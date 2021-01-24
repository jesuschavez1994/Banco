import { Component, OnInit,Input, Output, ChangeDetectorRef } from '@angular/core';
import { DataProductDB } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-catalogo-bank-product',
  templateUrl: './catalogo-bank-product.component.html',
  styleUrls: ['./catalogo-bank-product.component.css']
})
export class CatalogoBankProductComponent implements OnInit {

  @Input() index: number;
  @Input() item: DataProductDB;
  @Input() MyProduct: DataProductDB;


  oculto: number = 100;

  // tslint:disable-next-line: ban-types
  showCards = false;
  indexProductoDelete: any;
  idProducto: any;
  id: string;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  Id(index){
    console.log(index);
    console.log(this.MyProduct[index].id);
    return this.id = this.MyProduct[index].id;
  }

  refresh(){
    this.cd.detectChanges();
  }


}
