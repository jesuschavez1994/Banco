import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { EditProductStore } from '@interfaces/interfaceEditProductStore';
@Component({
  selector: 'app-edit-produtc',
  templateUrl: './edit-produtc.component.html',
  styleUrls: ['./edit-produtc.component.css']
})
export class EditProdutcComponent implements OnInit {

  // FORMULARIO //
  forma: FormGroup;

  // ARRAY PARA GUARDAR LAS IMAGENES //
  File: any[] =
  [
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null}
  ];

  // ICONOS //
  hover = false;
  icon = false;


  // VARIABLES USADAS PARA LA EDICION //

  LengtImgEdit: any;
  ImgEdit: any;
  exitLoadImg = false;

  // VARIABLE DEL PARAMS //

  idProduct: string;

  // VARIABLES DE LOS SELECT //

  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;
  subcategoria: string;
  categoriaBanco: any;
  subCategoriaBanco: any;

  delivery = [
    {
      delivery: 'Si'
    },
    {
      delivery: 'No'
    }
  ];

  disponibilidad = [
    {
      disponibilidad: 'Si'
    },
    {
      disponibilidad: 'No'
    }
  ]

  valorForm: EditProductStore;

  constructor(private _cd: ChangeDetectorRef,
              public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              public _productLoadingService: ProductLoadingService) {

              
                this.route.params.subscribe( (params: Params) => {

                  this.idProduct = params.id;
                  console.log(params);
                  this.storeService.getSpecificProduct(localStorage.getItem('id'), localStorage.getItem('storeId'),this.idProduct).subscribe( (data: EditProductStore) => {
                    console.log('Datas', data);
                    this.LengtImgEdit = data.images;

                    this.valorForm = data;
                    this.subCategoriaBanco = data.subcategories[0].name;
                    console.log('SUBCATEGORIA DEFAULT', this.subCategoriaBanco );

                    // SET DE CATEGORIA
                    this._productLoadingService.GetCategoriasBancoProduct(this.valorForm.subcategories[0].category_id).subscribe( (resp: any) =>{
                      console.log('categorias', resp);
                      this.categoriaBanco = resp.name;
                      
                    });
 
                    if( this.LengtImgEdit.length > 1){

                      for( let i = 0; i < data.images.length; i++){
                        this.File.splice(i, 1, { image: data.images[i].src_size.l, name: data.images[i].name, position: i + 1 });
                        this.exitLoadImg = true;
                        console.log('File', this.File);
                      }

                      // this.ImgEdit = data.images[0].src_size.l;
                      // console.log('IMAGES EDIT', data.images[0].src_size.l);
                      // this.File.splice(0, 1, { image: data.images[0].src_size.l, name: data.images[0].name, position: 0 });
                      // console.log('File', this.File);
                      // this.exitLoadImg = true;
                    }

                    // SET DE FORMULARIO //
                    this.forma.controls['name'].setValue(this.valorForm.name);
                    this.forma.controls['description'].setValue(this.valorForm.description);
                    this.forma.controls['mark'].setValue(this.valorForm.marks[0].name);
                    this.forma.controls['factory'].setValue(this.valorForm.factories[0].name);
                    this.forma.controls['price'].setValue(this.valorForm.price);
                    this.forma.controls['stock'].setValue(this.valorForm.stock);
                    this.forma.controls['recipe'].setValue(this.valorForm.recipes[0].name);
                    this.forma.controls['subcategory_id'].setValue(this.subCategoriaBanco);
                    this.forma.controls['category'].setValue(this.categoriaBanco);

                    // EVALUAMOS LOS CAMPOS SELECT //
                    if( this.valorForm.delivery.delivery === 'true' ){
                      this.forma.controls['delivery'].setValue(this.delivery[0].delivery);
                      console.log('Delivery', this.valorForm.delivery.delivery);
                    }else{
                      this.forma.controls['delivery'].setValue(this.delivery[1].delivery);
                    }

                    if( this.valorForm.aviable === 'true' ){
                      this.forma.controls['aviable'].setValue(this.disponibilidad[0].disponibilidad);
                      console.log('Disponibilidad', this.valorForm.aviable);
                    }else{
                      this.forma.controls['aviable'].setValue(this.disponibilidad[1].disponibilidad);
                    }

                    

                  });
                });


                // DECLARAMOS EL FORMULARIO //
                this.forma = new FormGroup({
                  name: new FormControl('', [Validators.required, Validators.minLength(5)]),
                  description: new FormControl('', [Validators.required, Validators.minLength(5)]),
                  price: new FormControl('', [Validators.required, Validators.minLength(1)]),
                  mark: new FormControl(''),
                  factory: new FormControl('Seleccionar'),
                  category: new FormControl(this.categoriaBanco, [Validators.required]),
                  subcategory_id: new FormControl('', [Validators.required]),
                  delivery: new FormControl(''),
                  aviable: new FormControl(''),
                  stock: new FormControl('', [Validators.required, Validators.minLength(1)]),
                  recipe: new FormControl('Seleccionar', [Validators.required]),
                  file: new FormControl(''),
                  input0: new FormControl(''),
                  input1: new FormControl(''),
                  input2: new FormControl(''),
                  input3: new FormControl(''),
                  input4: new FormControl(''),
                });



               }

  ngOnInit(): void {

       // GET CATEGORIAS //
       this._productLoadingService.GetCategorias()
       .subscribe( response => {
         console.log(response);
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

  }

  addProducts(){}

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

  onChange(centroId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++){
      if ( this.category[i].name ===  centroId){
        this._productLoadingService.GetSubcategorias(this.category[i].id)
          .subscribe( (response: any) => {
          console.log('sub', response);
          return this.subcategory = response;
        });
      }
    }

  }

  Subcategory(event: string){
    console.log('Log', event);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subcategory.length; i++){
      if ( this.subcategory[i].name === event ){
        console.log(this.subcategory[i].id);
        // return this.forma.get('subcategory_id').setValue(this.subcategory[i].id);
      }
    }
  }

  openDialog(){

  }

  Send(){

  }

}
