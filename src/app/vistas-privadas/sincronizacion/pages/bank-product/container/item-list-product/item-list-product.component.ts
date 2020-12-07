import { Component, OnInit, Input } from '@angular/core';
import { DataProductDB } from '@interfaces/InterfaceProducto';

@Component({
  selector: 'app-item-list-product',
  templateUrl: './item-list-product.component.html',
  styleUrls: ['./item-list-product.component.css']
})
export class ItemListProductComponent implements OnInit {

  @Input() index: string;
  @Input() item: DataProductDB;
  @Input() MyProduct: DataProductDB;

  constructor() { }

  ngOnInit(): void {
  }

}
