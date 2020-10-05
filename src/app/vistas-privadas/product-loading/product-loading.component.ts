import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '../../services/product-loading/product-loading.service';

@Component({
  selector: 'app-product-loading',
  templateUrl: './product-loading.component.html',
  styleUrls: ['./product-loading.component.css']
})
export class ProductLoadingComponent implements OnInit {

  forma: FormGroup;
  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;

  // tslint:disable-next-line: variable-name
  constructor(public _productLoadingService: ProductLoadingService) {

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mark: new FormControl(''),
      factory: new FormControl(''),
      category: new FormControl(''),
      subcategory_id: new FormControl('Seleccionar'),
      delivery: new FormControl(''),
      aviable: new FormControl(''),
      quantity: new FormControl(''),
      recipe: new FormControl(''),
    });

  }

  ngOnInit() {
    // GET CATEGORIAS //
    this._productLoadingService.GetCategorias(localStorage.getItem('id')).subscribe( response => {
      return this.category = response;
    });

    // GET MARCA //
    this._productLoadingService.GetMark(localStorage.getItem('id')).subscribe( response => {
      this.marks = response;
      console.log(this.marks);
    });

    // GET FABRICANTE //
    this._productLoadingService.GetFactories(localStorage.getItem('id')).subscribe( response => {
      console.log('factories', response);
      this.factories = response;
    });

    // RECETA MEDICA //
    this._productLoadingService.GetRecetaMedica(localStorage.getItem('id')).subscribe( response => {
      console.log('recipes', response);
      this.recipes = response;
    });


  }

  SelectCategory(index: string){
    console.log(index);
  }

  onChange(centroId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++){
      if ( this.category[i].name ===  centroId){
        this._productLoadingService.GetSubcategorias(localStorage.getItem('id'), i).subscribe( response => {
          console.log('sub', response);
          return this.subcategory = response;
        });
      }
    }

  }

  addProducts(){

  }

}
