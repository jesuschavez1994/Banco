import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { EditProductStore } from '@interfaces/interfaceEditProductStore';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  SidebarSections,
  AnchorsMenu,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';

@Component({
  selector: 'app-edit-sincronizacion',
  templateUrl: './edit-sincronizacion.component.html',
  styleUrls: ['./edit-sincronizacion.component.css'],
})
export class EditSincronizacionComponent implements OnInit {
  // FORMULARIO //
  forma: FormGroup;

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

  delivery: any;

  // VARIABLES DE SINCRONIZACION //

  myFlag = false;
  sync: string;
  bankId: string;
  IMG: any[] = [];

  // ESTADO DE DELIVERY //
  delivery_estado = [
    {
      delivery_nombre: 'Si',
      delivery: 'true',
    },
    {
      delivery_nombre: 'No',
      delivery: 'false',
    },
  ];

  // ESTADO DE DISPONIBILIDAD //
  disponibilidad_estado = [
    {
      disponibilidad_nombre: 'Si',
      disponibilidad: 'true',
    },
    {
      disponibilidad_nombre: 'No',
      disponibilidad: 'false',
    },
  ];

  // ESTADO DE SUBCATEGORIA //
  subcategory_estado: any[] = [
    {
      subcategoria_nombre: null,
      subcategoria: null,
    },
  ];

  valorForm: any;

  anchorsMenu: AnchorsMenu[] = [];
  sidebarSections: SidebarSections;

  constructor(
    private _cd: ChangeDetectorRef,
    public storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    public _productLoadingService: ProductLoadingService,
    private sincronizacion: SincronizacionService,
    private spinnerService: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private _sidebarListService: SidebarListService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.idProduct = params.id;
      console.log(params);
      this.storeService
        .getSpecificProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          this.idProduct
        )
        .subscribe((data: EditProductStore) => {
          console.log('Datas', data);
          this.delivery = data.delivery;
          this.myFlag = true;
          this.sync = 'sync';
          this.valorForm = data;
          this.spinnerService.hide();
          this.subCategoriaBanco = data.subcategories[0].name;
          console.log('SUBCATEGORIA DEFAULT', this.subCategoriaBanco);

          // SET DE CATEGORIA
          this._productLoadingService
            .GetCategoriasBancoProduct(
              this.valorForm.subcategories[0].category_id
            )
            .subscribe((resp: any) => {
              console.log('categorias', resp);
              this.categoriaBanco = resp.name;

              // PETICIÓN SUBCATEGORIAS //
              this._productLoadingService
                .GetSubcategorias(resp.id)
                .subscribe((response: any) => {
                  console.log('sub', response);
                  this.subcategory_estado.splice(0, 1, {
                    subcategoria_nombre: response[0].name,
                    subcategoria: response[0].id,
                  });
                  console.log(this.subcategory_estado);
                });
            });

          // SET DE FORMULARIO //
          this.forma.controls['name'].setValue(this.valorForm.name);
          this.forma.controls['description'].setValue(
            this.valorForm.description
          );
          this.forma.controls['mark'].setValue(this.valorForm.marks[0].name);
          this.forma.controls['factory'].setValue(
            this.valorForm.factories[0].name
          );

          this.forma.controls['price'].setValue(this.valorForm.price);
          this.forma.controls['stock'].setValue(this.valorForm.stock);
          if (this.valorForm.recipes.length > 0) {
            this.forma.controls['recipe'].setValue(
              this.valorForm.recipes[0].name
            );
          }
          this.forma.controls['subcategory_id'].setValue(
            this.subcategory_estado[0].subcategoria
          );
          // END SET DE FORMULARIO //

          // EVALUAMOS LOS CAMPOS SELECT //
          if (this.valorForm.delivery === 'true') {
            this.forma.controls['delivery'].setValue(
              this.delivery_estado[0].delivery
            );
            console.log('Delivery', this.valorForm.delivery);
          } else {
            this.forma.controls['delivery'].setValue(
              this.delivery_estado[1].delivery
            );
          }

          if (this.valorForm.aviable === 'true') {
            this.forma.controls['aviable'].setValue(
              this.disponibilidad_estado[0].disponibilidad
            );
            console.log('Disponibilidad', this.valorForm.aviable);
          } else {
            this.forma.controls['aviable'].setValue(
              this.disponibilidad_estado[1].disponibilidad
            );
          }

          /// IMAGEN DEL BANCO //

          if (data.sync_bank[0].images.length === 1) {
            this.IMG.push(data.sync_bank[0].images[0].src_size.l);
          }

          if (
            data.sync_bank[0].images.length > 1 &&
            data.sync_bank[0].images.length <= 2
          ) {
            this.IMG.push(data.sync_bank[0].images[0].src_size.l);
            this.IMG.push(data.sync_bank[0].images[1].src_size.l);
          }

          if (
            data.sync_bank[0].images.length > 2 &&
            data.sync_bank[0].images.length <= 3
          ) {
            this.IMG.push(data.sync_bank[0].images[0].src_size.l);
            this.IMG.push(data.sync_bank[0].images[1].src_size.l);
            this.IMG.push(data.sync_bank[0].images[2].src_size.l);
          }

          if (
            data.sync_bank[0].images.length > 3 &&
            data.sync_bank[0].images.length <= 4
          ) {
            this.IMG.push(data.sync_bank[0].images[0].src_size.l);
            this.IMG.push(data.sync_bank[0].images[1].src_size.l);
            this.IMG.push(data.sync_bank[0].images[2].src_size.l);
            this.IMG.push(data.sync_bank[0].images[3].src_size.l);
          }

          if (
            data.sync_bank[0].images.length > 4 &&
            data.sync_bank[0].images.length <= 5
          ) {
            this.IMG.push(data.sync_bank[0].images[0].src_size.l);
            this.IMG.push(data.sync_bank[0].images[1].src_size.l);
            this.IMG.push(data.sync_bank[0].images[2].src_size.l);
            this.IMG.push(data.sync_bank[0].images[3].src_size.l);
            this.IMG.push(data.sync_bank[0].images[4].src_size.l);
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
        });
    });

    // DECLARAMOS EL FORMULARIO //
    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      mark: new FormControl(''),
      factory: new FormControl('Seleccionar'),
      category: new FormControl('', [Validators.required]),
      subcategory_id: new FormControl('', [Validators.required]),
      delivery: new FormControl(''),
      aviable: new FormControl(''),
      stock: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
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
    this.spinner();

    // GET CATEGORIAS //
    this._productLoadingService.GetCategorias().subscribe((response) => {
      console.log(response);
      return (this.category = response);
    });

    // GET MARCA //
    this._productLoadingService
      .GetMark(localStorage.getItem('id'))
      .subscribe((response) => {
        this.marks = response;
        console.log(this.marks);
      });

    // GET FABRICANTE //
    this._productLoadingService
      .GetFactories(localStorage.getItem('id'))
      .subscribe((response) => {
        console.log('factories', response);
        this.factories = response;
      });

    // RECETA MEDICA //
    this._productLoadingService
      .GetRecetaMedica(localStorage.getItem('id'))
      .subscribe((response) => {
        this.recipes = response;
      });

    this.setSidebarSections();
    this.loadAnchorsMenuData();
  }

  spinner(): void {
    this.spinnerService.show();
  }

  onChange(centroId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].name === centroId) {
        this._productLoadingService
          .GetSubcategorias(this.category[i].id)
          .subscribe((response: any) => {
            console.log('sub', response);
            return (this.subcategory = response);
          });
      }
    }
  }

  Subcategory(event: string) {
    console.log('Log', event);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subcategory.length; i++) {
      if (this.subcategory[i].name === event) {
        console.log(this.subcategory[i].id);
        // return this.forma.get('subcategory_id').setValue(this.subcategory[i].id);
      }
    }
  }

  addProducts() {}

  openDialog() {}

  Send() {
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
      this.forma.value.recipe
    );

    this._productLoadingService
      .EditProduct(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        this.idProduct,
        data
      )
      .subscribe((resp) => {
        this._snackBar.open('Se ha editado el producto', 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/my-store/product-catalogue']);
        console.log(resp);
      });
  }

  loadAnchorsMenuData() {
    const id = localStorage.getItem('storeId');
    this.anchorsMenu = [
      {
        anchorName: 'Contacto',
        anchorLink: `/my-store/contact`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Productos',
        anchorLink: `/my-store/product-catalogue`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Sincronización',
        anchorLink: `/my-store/sincronizacion/exportar-lista-excel`,
        wordToMatch: `products`,
      },
      // {
      //   anchorName: 'Ventas',
      //   anchorLink: `/my-store/ventas`,
      // },
    ];

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu);
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: false,
    };

    this._sidebarListService.setRequiredSections(this.sidebarSections);
  }
}
