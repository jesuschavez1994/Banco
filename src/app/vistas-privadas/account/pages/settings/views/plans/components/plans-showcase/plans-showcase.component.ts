import { Component, OnInit } from '@angular/core';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plans-showcase',
  templateUrl: './plans-showcase.component.html',
  styleUrls: ['./plans-showcase.component.scss'],
})
export class PlansShowcaseComponent implements OnInit {
  plans: Array<Plan>;
  selectedPlan: Plan;

  constructor() {}

  ngOnInit(): void {
    this.plans = [
      new Plan(
        0,
        'basic',
        6610,
        [
          { description: 'Carga de 100 productos.', available: true },
          { description: 'Horario de negocio.', available: true },
          { description: 'Radio de despacho.', available: true },
          { description: 'Pasarela de pago.', available: true },
        ],
        [{ index: 0, amountOfPictures: 100, price: 58712 }]
      ),
      new Plan(
        1,
        'standard',
        11999,
        [
          { description: 'Carga de 100 productos.', available: true },
          { description: 'Horario de negocio.', available: true },
          { description: 'Radio de despacho.', available: true },
          { description: 'Pasarela de pago.', available: true },
        ],
        [
          { index: 0, amountOfPictures: 100, price: 58712 },
          { index: 1, amountOfPictures: 300, price: 110999 },
        ]
      ),
      new Plan(
        2,
        'premium',
        14678,
        [
          { description: 'Carga de 100 productos.', available: true },
          { description: 'Horario de negocio.', available: true },
          { description: 'Radio de despacho.', available: true },
          { description: 'Pasarela de pago.', available: true },
        ],
        [
          { index: 0, amountOfPictures: 100, price: 58712 },
          { index: 1, amountOfPictures: 300, price: 110999 },
          { index: 2, amountOfPictures: '300+', price: 146780 },
        ]
      ),
    ];

    this.selectedPlan = new Plan(
      0,
      'basic',
      6610,
      [
        { description: 'Carga de 100 productos.', available: true },
        { description: 'Horario de negocio.', available: true },
        { description: 'Radio de despacho.', available: true },
        { description: 'Pasarela de pago.', available: true },
      ],
      [{ index: 1, amountOfPictures: 100, price: 58712 }]
    );
  }
}
