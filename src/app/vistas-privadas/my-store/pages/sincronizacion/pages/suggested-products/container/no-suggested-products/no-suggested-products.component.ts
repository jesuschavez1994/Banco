import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-suggested-products',
  templateUrl: './no-suggested-products.component.html',
  styleUrls: ['./no-suggested-products.component.css']
})
export class NoSuggestedProductsComponent implements OnInit {

  constructor() { }

  NosuggestedPrdouct = {
    img: '../../../../../../../assets/img/sincronizacion/interrogante.svg',
    text: '¿Aún no tienes cargado tu inventario?, te proporcionamos nuestro banco de productos, ¿quieres verlo?',
    buttonmessage: 'Ver banco de productos'
  };


  ngOnInit(): void {
  }

}
