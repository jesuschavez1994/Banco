import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ModalAddCategoriasAndSubcategoriasComponent} from './container/modals/modal-add-categorias-and-subcategorias/modal-add-categorias-and-subcategorias.component'

import {ActivatedRoute, Params, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-product-loading',
  templateUrl: './product-loading.component.html',
  styleUrls: ['./product-loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductLoadingComponent implements OnInit {

  animal: string;
  nameCategory: string;

  forma: FormGroup;
  detalle: DetalleProduct;
  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;
  subcategoria: string;
  myFlag = false;
  // Con input //
  // tslint:disable-next-line: max-line-length
  File: any[] =
  [
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null}
  ];
  hover = false;
  icon = false;
  imagen = [];
  sendImagen = [];
  cardShimmer = true;
  LastPage: number;
  // tslint:disable-next-line: no-inferrable-types

  foods = [];
  // tslint:disable-next-line: ban-types
  MyProduct: DataProductDB[] = [];
  itemProductos: DataProductDB[] = [];
  DescripcionProduct: DataProductDB;
  // tslint:disable-next-line: no-inferrable-types
  pagesActual: number = 1;
  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1;

  // tslint:disable-next-line: variable-name
  constructor(public _productLoadingService: ProductLoadingService,
              // tslint:disable-next-line: variable-name
              private _cd: ChangeDetectorRef,
              public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) {

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
      file: new FormControl(''),
      input0: new FormControl(''),
      input1: new FormControl(''),
      input2: new FormControl(''),
      input3: new FormControl(''),
      input4: new FormControl(''),
    });
  }

  ngOnInit() {

    this.storeService.ProductGet(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( (resp: ProductosLoads) => {
      this.itemProductos = resp.data;
      console.log('ITEM', this.itemProductos);
    });

    // GET CATEGORIAS //
    this._productLoadingService.GetCategorias(
      localStorage.getItem('id'))
      .subscribe( response => {
      return this.category = response;
    });

    // GET MARCA //
    this._productLoadingService.GetMark(
      localStorage.getItem('id'))
      .subscribe( response => {
      this.marks = response;
      console.log(this.marks);
    });

    // GET FABRICANTE //
    this._productLoadingService.GetFactories(
      localStorage.getItem('id'))
      .subscribe( response => {
      console.log('factories', response);
      this.factories = response;
    });

    // RECETA MEDICA //
    this._productLoadingService.GetRecetaMedica(
      localStorage.getItem('id'))
      .subscribe( response => {
      this.recipes = response;
    });

    this.getData(this.page);

    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });


  }

  SelectCategory(index: string){
    console.log(index);
  }

  onChange(centroId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++){
      if ( this.category[i].name ===  centroId){
        this._productLoadingService.GetSubcategorias(
          localStorage.getItem('id'), i)
          .subscribe( (response: any) => {
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

    this.storeService.createProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      data).pipe( switchMap( ( response: DataProductDB ) => {
        return this.storeService.ImagenProduct(localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        response.id,
        images);
      })).subscribe( (imgProduct: Image) => {
        this.imagen.push(imgProduct[0]);
        console.log('RESPONSE', imgProduct);
    });

  }

  Send(){
    this.getData();
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
    this.forma.controls.name.setValue('');
    this.forma.controls.description.setValue('');
    this.forma.controls.price.setValue('');
    this.forma.controls.mark.setValue('Seleccionar');
    this.forma.controls.factory.setValue('Seleccionar');
    this.forma.controls.category.setValue('Seleccionar');
    this.forma.controls.subcategory_id.setValue('Seleccionar');
    this.forma.controls.delivery.setValue('Seleccionar');
    this.forma.controls.aviable.setValue('Seleccionar');
    this.forma.controls.stock.setValue('');
    this.forma.controls.recipe.setValue('Seleccionar');
    this.forma.controls.file.setValue('');
    this.forma.controls.input0.reset();
    this.forma.controls.input1.reset();
    this.forma.controls.input2.reset();
    this.forma.controls.input3.reset();
    this.forma.controls.input4.reset();
    for ( let i = 0; i < this.File.length; i++){
      this.File.splice(i, 1, {image: null, name: null, position: null});
    }
    console.log(this.File);
  }

  Delete(i: number){
    console.log(i);
    this.storeService.DeleteProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.MyProduct[i].id).subscribe( resp => {
      console.log(resp);
      // this.ngOnInit();
    });
  }

  // Funcion para el cambio de paginación //

  // En este caso lo que hará es que “reasignará”
  // la URL y obtendrá la información usando la nueva página
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

    this.storeService.geatAllProducts(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page)
      .subscribe( (resp: ProductosLoads) => {
        this.MyProduct = resp.data;
        console.log('MY PRODUCTOS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.cardShimmer = false;
    });

  }

  addFood(food) {
    this.foods = [...this.foods, food];
    console.log(this.foods);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddCategoriasAndSubcategoriasComponent, {
      width: '250px',
      data: {
        nameCategory: this.forma.value.category,
        animal: this.animal
      }
    });

     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

  }

}
