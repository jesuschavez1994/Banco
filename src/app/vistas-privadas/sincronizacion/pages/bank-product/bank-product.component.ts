import { Component, OnInit } from '@angular/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { ProductosLoads,  DataProductDB} from '@interfaces/InterfaceProducto';

@Component({
  selector: 'app-bank-product',
  templateUrl: './bank-product.component.html',
  styleUrls: ['./bank-product.component.css']
})
export class BankProductComponent implements OnInit {

  itemProduct: DataProductDB[];

  constructor(public sincronizacion: SincronizacionService) { }

  ngOnInit(): void {
    this.sincronizacion.GetBankProduct().subscribe( (resp: ProductosLoads) => {
      console.log('Banck Product', resp.data);
      this.itemProduct = resp.data;
    });
  }

}
