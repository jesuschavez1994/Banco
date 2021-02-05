import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-under-construction',
  templateUrl: './page-under-construction.component.html',
  styleUrls: ['./page-under-construction.component.scss']
})
export class PageUnderConstructionComponent implements OnInit {

  information = [{

    texto1: {
      information_Relevante: '¡El primer Marketplace en cargar las fotos de tús productos!',
      footer_information: 'En nuestra plataforma encontrarás una fácil y práctica forma de digitalizar los productos de tú farmacia, ¿de qué manera?'
    },

    texto2: {
      item1: 'Digitalizándote en la web sin que tomes ni una foto de tus medicinas.',
      item2: 'Sincronizando tu inventario con un banco de imágenes en nuestra plataforma.',
      item3: 'Eres tú, quien escoge el radio en que despacharás a tus clientes.',
      item4: 'Digitalizándote en poco tiempo con más de 5 mil productos.',
      item5: 'Ofrecerlo a potenciales clientes.'
    }


  }];

  constructor() { }

  ngOnInit(): void {
  }

}
