import { Component, OnInit } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  constructor(  
    private router: Router, ) { }

  ngOnInit(): void {
  }

}
