import { Component, OnInit } from '@angular/core';
import { BankProductService } from '../../services/bank-product.service';
import { DataProductDB, ProductosLoads } from '../../../../interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-load-banck-product',
  templateUrl: './load-banck-product.component.html',
  styleUrls: ['./load-banck-product.component.css']
})
export class LoadBanckProductComponent implements OnInit {

  itemProduct: DataProductDB[]; 
  // tslint:disable-next-line: no-inferrable-types
  pagesActual: number = 1;
  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1;

  constructor(public bankService: BankProductService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {

    this.getData(this.page);
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

  }



  pageChanged(page: number) {
    this.page = page;
    const queryParams: Params = {page};
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );
    this.getData(this.page);
  }

  getData(page?: number){
    this.bankService.GetBankProduct(page).subscribe( (resp: ProductosLoads) => {
        this.itemProduct = resp.data;
        console.log('RESPUESTA', resp);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
    });
  }


}
