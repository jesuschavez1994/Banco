import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { SincronizacionService } from '../../../../services/sincronizacion/sincronizacion.service';

class Sincronizacion {

  constructor(
      public bank_id?: string,
      public store_id?: string,
      public price?: string,
      public stok?: string,
      public aviable?: string,
      public delivery?: string,
      public subcategory_id?: string,
      public mark?: string,
      public factory?: string,
      public recipe?: string,

  ) { }

}

@Component({
  selector: 'app-form-banck-product-sync',
  templateUrl: './form-banck-product-sync.component.html',
  styleUrls: ['./form-banck-product-sync.component.css']
})
export class FormBanckProductSyncComponent implements OnInit {

  forma: FormGroup;
  hover = false;
  icon = false;
  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;
  subcategoria: string;
  subcategoriaId: string;
  IMG: any[] = [];
  
  valorForm: any;
  categoriaBanco: any;
  myFlag = false;
  sync: string;
  bankId: string;


  File: any[] =
  [
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null}
  ];

  constructor(public _productLoadingService: ProductLoadingService, 
              private _cd: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private sincronizacion: SincronizacionService) { 

                this.route.params.subscribe( (params: Params) => {
                  console.log(params);
                  this.sincronizacion.GetBankProductSpecific(params.id).subscribe( (data: any) => {
                    console.log('Banck Product', data);
                    this.myFlag = true;
                    this.bankId = data.id;
                    this.sync = 'sync'
                    this.valorForm = data;
                    this.subcategoria = data.subcategories[0].name;
                    this.subcategoriaId = data.subcategories[0].id;

                    this._productLoadingService.GetCategoriasBancoProduct(this.valorForm.subcategories[0].category_id).subscribe( (resp: any) =>{
                      console.log('categorias', resp);
                      this.categoriaBanco = resp.name;

                    });
            
                    // SET DE FORMULARIO //
                    this.forma.controls['name'].setValue(this.valorForm.name);
                    this.forma.controls['description'].setValue(this.valorForm.description);
                    this.forma.controls['mark'].setValue(this.valorForm.marks[0].name);
                    this.forma.controls['factory'].setValue(this.valorForm.factories[0].name);


                    if(data.images.length === 1){
                      this.IMG.push(data.images[0].src_size.l);
                    }

                    if(data.images.length > 1 && data.images.length <= 2){
                      this.IMG.push(data.images[0].src_size.l);
                      this.IMG.push(data.images[1].src_size.l);
                    }

                    if(data.images.length > 2 && data.images.length <= 3){
                      this.IMG.push(data.images[0].src_size.l);
                      this.IMG.push(data.images[1].src_size.l);
                      this.IMG.push(data.images[2].src_size.l);
                    }

                    if(data.images.length > 3 && data.images.length <= 4){
                      this.IMG.push(data.images[0].src_size.l);
                      this.IMG.push(data.images[1].src_size.l);
                      this.IMG.push(data.images[2].src_size.l);
                      this.IMG.push(data.images[3].src_size.l);
                    }

                    if(data.images.length > 4 && data.images.length <= 5){
                      this.IMG.push(data.images[0].src_size.l);
                      this.IMG.push(data.images[1].src_size.l);
                      this.IMG.push(data.images[2].src_size.l);
                      this.IMG.push(data.images[3].src_size.l);
                      this.IMG.push(data.images[4].src_size.l);
                    }
                    
                    console.log('IMGPUSH', this.IMG);
            
                    // BLOQUEAMOS LOS CAMPOS RESPECTIVOS YA QUE NO LOS DEBE EDITAR //
                    this.forma.get('name').disable();
                    this.forma.get('description').disable();
                    this.forma.get('mark').disable();
                    this.forma.get('factory').disable();
                    this.forma.get('category').disable();
                    this.forma.get('subcategory_id').disable();
                    // SETEAMOS LA CANTIDAD DEL PRODUCTO POR DEFAUL YA QUE DEBE SER DE 1 al menos //
                    this.forma.get('stock').setValue('1');
            
                  });
            
                });  

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required]),
      mark: new FormControl(''),
      factory: new FormControl(''),
      category: new FormControl(this.categoriaBanco),
      subcategory_id: new FormControl(''),
      delivery: new FormControl('Seleccionar'),
      aviable: new FormControl('Seleccionar'),
      stock: new FormControl('', [Validators.required, Validators.minLength(1)]),
      recipe: new FormControl('', [Validators.required]),
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
      this._productLoadingService.GetCategorias().subscribe( response => {
       console.log(response);
        return this.category = response;
      });

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

  Send(){
    const data = new Sincronizacion(
      this.bankId ,
      localStorage.getItem('storeId'),
      JSON.stringify(this.forma.value.price),
      this.forma.value.stock,
      this.forma.value.aviable,
      this.forma.value.delivery,
      this.subcategoriaId,
      this.valorForm.marks[0].name,
      this.valorForm.factories[0].name,
      this.forma.value.recipe,
    )

    this.sincronizacion.SincronizarDesdeBancoPrdoducto(localStorage.getItem('id'), localStorage.getItem('storeId'), data).subscribe( resp => {
      console.log('sincronizo', resp);
    })

  }

}
