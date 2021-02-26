import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SincronizacionService } from '../../../services/sincronizacion/sincronizacion.service';
import { EditProductStore } from '@interfaces/interfaceEditProductStore';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { URL_SERVICIOS } from '../../../config/config';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { throwError, concat, of } from 'rxjs';
import {
  SidebarSections,
  AnchorsMenu,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';

const URL = URL_SERVICIOS;

export class ImgEdit {
  constructor(
    public image: string,
    public name: string,
    public position: string
  ) {}
}

@Component({
  selector: 'app-edit-product-no-disponible',
  templateUrl: './edit-product-no-disponible.component.html',
  styleUrls: ['./edit-product-no-disponible.component.css'],
})
export class EditProductNoDisponibleComponent implements OnInit {
  forma: FormGroup;

  // VARIABLES DE LOS SELECT //
  category: any;
  subcategory: any;
  marks: any;
  factories: any;
  recipes: any;
  subcategoria: string;
  subCategoriaBanco: any;
  categoriaBanco: any;
  valorForm: EditProductStore;

  // VARIABLE DEL PARAMS //
  idProduct: string;

  // ICONOS //
  hover = false;
  icon = false;

  // ARRAY PARA GUARDAR LAS IMAGENES //
  File: any[] = [
    { image: null, name: null, position: null, id: null },
    { image: null, name: null, position: null, id: null },
    { image: null, name: null, position: null, id: null },
    { image: null, name: null, position: null, id: null },
  ];

  // VARIABLES PARA LAS IMAGENES //

  showImages = false;
  imagen = [];

  // VARIABLES USADAS PARA LA EDICION //
  LengtImgEdit: any;
  ImgEdit: any;
  exitLoadImg = false;
  showForm = false;

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

  // Sidebar related parameters
  anchorsMenu: AnchorsMenu[] = [];
  sidebarSections: SidebarSections;

  constructor(
    public _productLoadingService: ProductLoadingService,
    private _cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private sincronizacion: SincronizacionService,
    public storeService: StoreService,
    private _snackBar: MatSnackBar,
    private spinnerService: NgxSpinnerService,
    private _sidebarListService: SidebarListService
  ) {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.idProduct = params.id;

      this.storeService
        .getSpecificProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          params.id
        )
        .subscribe((data: EditProductStore) => {
          console.log(data);

          this.valorForm = data;
          // console.log('this.valorForm', this.valorForm);
          this.showImages = true;
          this.showForm = true;
          this.spinnerService.hide();

          if (this.valorForm.subcategories.length !== 0) {
            this.subCategoriaBanco = data.subcategories[0].name;

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
          }

          if (this.valorForm.images.length !== 0) {
            // Si images.length > 0 signidfica que puedo editar la imagen del producto
            this.LengtImgEdit = data.images;
            /// CARGAMOS LAS IMAGENES PARA MOSTRARLAS CUANDO EL PRODUCTO YA HA SIDO EDITADO ANTERIORMENTE //
            if (this.LengtImgEdit.length > 1) {
              for (let i = 0; i < data.images.length; i++) {
                if (data.images[i].name !== '_') {
                  this.File.splice(i, 1, {
                    image: `${URL}/${data.images[i].src_size.l}`,
                    name: data.images[i].name,
                    position: i + 1,
                    id: data.images[i].pivot.image_id,
                  });
                  this.forma.patchValue({
                    file: this.File[i].image,
                  });
                  this.exitLoadImg = true;
                  console.log('File', this.File);
                }
              }
            }
          }

          if (this.valorForm.images.length === 0) {
          }

          // SET DE FORMULARIO //
          this.forma.controls['name'].setValue(this.valorForm.name);
          this.forma.controls['description'].setValue(
            this.valorForm.description
          );

          if (this.valorForm.marks.length >= 1) {
            this.forma.controls['mark'].setValue(this.valorForm.marks[0].name);
          }
          if (this.valorForm.factories.length >= 1) {
            this.forma.controls['factory'].setValue(
              this.valorForm.factories[0].name
            );
          }
          if (this.valorForm.price !== null) {
            this.forma.controls['price'].setValue(this.valorForm.price);
          }
          if (this.valorForm.stock !== null) {
            this.forma.controls['stock'].setValue(this.valorForm.stock);
          }
          if (this.valorForm.recipes.length >= 1) {
            this.forma.controls['recipe'].setValue(
              this.valorForm.recipes[0].name
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

          if (this.valorForm.delivery !== null) {
            if (this.valorForm.delivery.delivery === 'true') {
              this.forma.controls['delivery'].setValue(
                this.delivery_estado[0].delivery
              );
              console.log('Delivery', this.valorForm.delivery.delivery);
            }
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
      mark: new FormControl('Seleccionar'),
      factory: new FormControl('Seleccionar'),
      category: new FormControl('Seleccionar', [Validators.required]),
      subcategory_id: new FormControl('Seleccionar', [Validators.required]),
      delivery: new FormControl('Seleccionar', [Validators.required]),
      aviable: new FormControl('Seleccionar', [Validators.required]),
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

    this.spinner();

    this.setSidebarSections();
    this.loadAnchorsMenuData();
  }

  spinner(): void {
    this.spinnerService.show();
  }

  addProducts() {}

  openDialog() {}

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

  onFileChange(event, index?: number) {
    const reader = new FileReader();
    console.log(event);

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.forma.patchValue({
          file: reader.result,
        });
        // console.log('imagen', this.forma.value.file);
        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
        this.File.splice(index, 1, {
          image: this.forma.value.file,
          name: event.target.files[0].name,
          position: index + 1,
        });
        console.log(this.File);
      };
    }
  }

  Send() {
    console.log('File', this.File.length);

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

    if (this.valorForm.images.length === 0) {
      const images = new ImgLoad(this.File);

      this.storeService
        .createProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          data
        )
        .pipe(
          switchMap((response: DataProductDB) => {
            return this.storeService
              .ImagenProduct(
                localStorage.getItem('id'),
                localStorage.getItem('storeId'),
                response.id,
                images
              )
              .catch((err) => {
                console.log(err);
                this.router.navigate(['/login']);
                swal({
                  text:
                    'Ha ocurrido un error, verifique si todos los campos han sido rellenados',
                  icon: 'warning',
                  dangerMode: true,
                });

                return Observable.throw(err);
              });
          })
        )
        .subscribe((imgProduct: Image) => {
          this.imagen.push(imgProduct[0]);
          this.router.navigate(['/my-store/product-catalogue']);
          this._snackBar.open('Se ha agregado un nuevo producto', 'Cerrar', {
            duration: 2000,
          });
          console.log('RESPONSE', imgProduct);
        });

      // this.storeService.ImagenProduct(localStorage.getItem('id'),
      // localStorage.getItem('storeId'),
      // this.idProduct,
      // images)
    }

    if (
      this.valorForm.marks.length === 0 &&
      this.valorForm.recipes.length === 0 &&
      this.valorForm.subcategories.length === 0
    ) {
      const images = new ImgLoad(this.File);

      this.storeService
        .createProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          data
        )
        .pipe(
          switchMap((response: DataProductDB) => {
            return this.storeService
              .ImagenProduct(
                localStorage.getItem('id'),
                localStorage.getItem('storeId'),
                response.id,
                images
              )
              .catch((err) => {
                console.log(err);
                this.router.navigate(['/login']);
                swal({
                  text:
                    'Ha ocurrido un error, verifique si todos los campos han sido rellenados',
                  icon: 'warning',
                  dangerMode: true,
                });

                return Observable.throw(err);
              });
          })
        )
        .subscribe((imgProduct: Image) => {
          this.imagen.push(imgProduct[0]);
          this.router.navigate(['/my-store/product-catalogue']);
          this._snackBar.open('Se ha agregado un nuevo producto', 'Cerrar', {
            duration: 2000,
          });
          console.log('RESPONSE', imgProduct);
        });
    } else {
      this._productLoadingService
        .EditProduct(
          localStorage.getItem('id'),
          localStorage.getItem('storeId'),
          this.idProduct,
          data
        )
        .subscribe(
          (resp) => {
            console.log(resp);
            if (this.valorForm.images.length !== 0) {
              for (let i = 0; i < this.File.length; i++) {
                console.log(i);

                if (this.File[i].name !== this.LengtImgEdit[i].name) {
                  // EStoy editando las images => Comparo si los nombres son iguales

                  const imgEdit = new ImgEdit(
                    this.File[i].image,
                    this.File[i].name,
                    this.File[i].position
                  );

                  console.log(this.LengtImgEdit[i].id);

                  console.log('Array', imgEdit);

                  console.log(this.idProduct);

                  if (imgEdit.image !== null) {
                    this._productLoadingService
                      .ImagenProductEdit(
                        localStorage.getItem('id'),
                        localStorage.getItem('storeId'),
                        this.idProduct,
                        this.LengtImgEdit[i].id,
                        imgEdit
                      )
                      .subscribe((resp) => {
                        console.log(resp);
                        this._snackBar.open(
                          'Se ha editado el producto',
                          'Cerrar',
                          {
                            duration: 2000,
                          }
                        );
                        this.router.navigate(['/my-store/product-catalogue']);
                      });
                  }
                }
              }
            }
          },
          (error) => {
            swal({
              text: 'Verifique si todos los campos han sido rellenados',
              icon: 'warning',
              dangerMode: true,
            });
          }
        );
    }
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
