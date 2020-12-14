import { Component, OnInit } from '@angular/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { ProductosLoads,  DataProductDB} from '@interfaces/InterfaceProducto';


export class Termino {
  constructor(
      public name: string,
  ) { }
}
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

  public handleSearch(value: string): void {
    let comparacion = new Termino( value  );
    console.log(value);
    this.sincronizacion.BuscadorBancoDeProductos(comparacion,
      localStorage.getItem('id'),
      localStorage.getItem('storeId')).subscribe( (resp: ProductosLoads) => {
        this.itemProduct = resp.data;
      })
  }

}
