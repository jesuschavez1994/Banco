import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '../../services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '../../models/dataStore.model';
import { StoreService } from '../../services/store/store.service';



@Component({
  selector: 'app-product-loading',
  templateUrl: './product-loading.component.html',
  styleUrls: ['./product-loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLoadingComponent implements OnInit {

  forma: FormGroup;
  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;
  subcategoria: string;
  // Con input //
  // tslint:disable-next-line: max-line-length
  File: any[] = [{image: null, name: null, position: null}, {image: null, name: null, position: null}, {image: null, name: null, position: null}, {image: null, name: null, position: null}];
  hover = false;
  icon = false;
  imagen: File;
  // tslint:disable-next-line: variable-name
  constructor(public _productLoadingService: ProductLoadingService, private _cd: ChangeDetectorRef, public storeService: StoreService) {

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)]),
      mark: new FormControl('Seleccionar'),
      factory: new FormControl('Seleccionar'),
      category: new FormControl('Seleccionar'),
      subcategory_id: new FormControl('Seleccionar'),
      delivery: new FormControl('Seleccionar'),
      aviable: new FormControl('Seleccionar'),
      stock: new FormControl('', [Validators.required, Validators.minLength(1)]),
      recipe: new FormControl('Seleccionar'),
      file: new FormControl('')
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
        this._productLoadingService.GetSubcategorias(localStorage.getItem('id'), i).subscribe( (response: any) => {
          console.log('sub', response);
          return this.subcategory = response;
        });
      }
    }

  }

  Subcategory(event){
    console.log('Log', event);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subcategory.length; i++){
      if ( this.subcategory[i].name === event ){
        console.log(this.subcategory[i].id);
        return this.forma.get('subcategory_id').setValue(this.subcategory[i].id);
      }
    }
  }

  addProducts(){

    const data = new DetalleProduct(
      this.forma.value.name,
      this.forma.value.description,
      this.forma.value.price,
      this.forma.value.mark,
      this.forma.value.factory,
      this.forma.value.category,
      this.forma.value.subcategory_id,
      this.forma.value.delivery,
      this.forma.value.aviable,
      this.forma.value.stock,
      this.forma.value.recipe,
    );

    const images = new ImgLoad(
      this.File
    );

    this.storeService.DetalleProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      data).subscribe( (response: any) => {
        console.log(response);
        this.storeService.ImagenProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          response.delivery.id,
          images).subscribe( resp => {
          console.log(resp);
        });
    });

  }

  onFileChange(event, index?: number) {
    const reader = new FileReader();
    console.log(event);

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.forma.patchValue({
          file: reader.result
        });

        console.log('imagen', this.forma.value.file);
        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
        this.File.splice(index, 1, { image: this.forma.value.file, name: event.target.files[0].name, position: index + 1 });
        if (this.File.length > 1){
          this.File.splice(index, 1, this.File[index]);
        }
        console.log(this.File);
      };
    }
  }

  Disponibilidad(event){
    switch (event){
      case 'Si':
        return this.forma.get('aviable').setValue(true);
      case 'No':
        return this.forma.get('aviable').setValue(false);
    }
  }

  Delivery(event){
    switch (event){
      case 'Si':
        return this.forma.get('delivery').setValue(true);
        case 'No':
        return this.forma.get('delivery').setValue(false);
    }
  }

  Reset(){
    this.forma.reset();
  }

}
