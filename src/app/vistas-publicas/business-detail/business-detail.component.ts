import { Component, OnInit } from '@angular/core';
import { Product } from '@interfaces/product.interface';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';
import { bannerOptions } from '@interfaces/components-options/banner.interface';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  sidebarListCtr = new SidebarListControler();

  products: Product[] = [
    {
      name: 'champu',
      description: 'Incluye 1 (2.03 libras) de polvo de proteína cremosa de chocolate con base de plantas orgánicas Orgain 21 gramos de proteína orgánica a base de plantas (guisante, arroz integral, semillas de chía), 6 gramos de fibra dietética orgánica, 3 gramos de carbohidratos netos, 0 gramos de azúcar, 150 calorías por porción. Mezcle con agua, leche o su receta favorita de batido de proteínas para un desayuno rápido o una merienda. Úselo cuando bakin gramos para darle a sus pasteles, magdalenas, brownies o galletas un impulso de proteínas y energía Ideal para una nutrición saludable y en movimiento para hombres, mujeres y niños.',
      cost: 25.01,
      inventary: 5,
      isFavorite: false,
      imgs: [
        'assets/img/test-img/magazine_vegan_food.jpg',
        'assets/img/test-img/organic_protein.jpg',
        'assets/img/test-img/banner.png'
      ]
    },
    {
      name: 'Orgain Polvo De Proteína Orgánica A Base De Plantas, Fudge De Chocolate Cremoso - Vegano, Carbohidratos Bajos En La Red, No Lácteos, Sin Gluten, Sin Lactosa, Sin Azúcar Añadido, Sin Soja, Kosher, Sin OMG, 2.03 Libras',
      description: 'Incluye 1 (2.03 libras) de polvo de proteína cremosa de chocolate con base de plantas orgánicas Orgain 21 gramos de proteína orgánica a base de plantas (guisante, arroz integral, semillas de chía), 6 gramos de fibra dietética orgánica, 3 gramos de carbohidratos netos, 0 gramos de azúcar, 150 calorías por porción. Mezcle con agua, leche o su receta favorita de batido de proteínas para un desayuno rápido o una merienda. Úselo cuando bakin gramos para darle a sus pasteles, magdalenas, brownies o galletas un impulso de proteínas y energía Ideal para una nutrición saludable y en movimiento para hombres, mujeres y niños.',
      cost: 25.01,
      inventary: 5,
      isFavorite: true,
      imgs: [
        'assets/img/test-img/organic_protein.jpg',
        'assets/img/test-img/magazine_vegan_food.jpg',
        'assets/img/test-img/banner.png'
      ]
    },

  ];

  selectedProduct: Product;

  constructor() {
    this.sidebarListCtr.expandSidebarlist = true;
  }

  ngOnInit(): void {
  }

  public selectProduct(event){
    this.selectedProduct = event;
    console.log(this.selectedProduct);
  }

}
