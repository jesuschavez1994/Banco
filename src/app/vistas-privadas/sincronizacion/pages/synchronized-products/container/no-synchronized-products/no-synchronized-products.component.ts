import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-synchronized-products',
  templateUrl: './no-synchronized-products.component.html',
  styleUrls: ['./no-synchronized-products.component.css']
})
export class NoSynchronizedProductsComponent implements OnInit {

  constructor() { }

  NosuggestedPrdouct = {
    img: '../../../../../../../assets/img/sincronizacion/interrogante.svg',
    text: 'Aún no tienes productos sincronizados',
    buttonmessage: 'Ver banco de productos'
  };

  ngOnInit(): void {
  }

}
