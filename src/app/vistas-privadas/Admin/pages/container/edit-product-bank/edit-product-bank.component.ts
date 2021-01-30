import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EditProductStore } from '@interfaces/interfaceEditProductStore';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { URL_SERVICIOS } from '../../../../../config/config';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { BankProductService } from '../../../services/bank-product.service';

const URL = URL_SERVICIOS;

export class ImgEdit {

  constructor(
      public image: string,
      public name: string,
      public position: string,
  ) { }

}

@Component({
  selector: 'app-edit-product-bank',
  templateUrl: './edit-product-bank.component.html',
  styleUrls: ['./edit-product-bank.component.css']
})
export class EditProductBankComponent implements OnInit {

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
  File: any[] =
  [
    {image: null, name: null, position: null, id: null},
    {image: null, name: null, position: null, id: null},
    {image: null, name: null, position: null, id: null},
    {image: null, name: null, position: null, id: null}
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
      delivery: 'true'
    },
    {
      delivery_nombre: 'No',
      delivery: 'false'
    }
  ];
  
  // ESTADO DE DISPONIBILIDAD //
  disponibilidad_estado = [
    {
      disponibilidad_nombre: 'Si',
      disponibilidad: 'true'
    },
    {
      disponibilidad_nombre: 'No',
      disponibilidad: 'false'
    }
  ]

  // ESTADO DE SUBCATEGORIA //
  subcategory_estado: any[] = [
    {
      subcategoria_nombre: null,
      subcategoria: null
    }
  ]

  constructor(private _cd: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              public bankService: BankProductService) {

              this.route.params.subscribe( params => { 
                console.log(params); 
                this.idProduct = params.id;

                this.bankService.getSpecificProductBank(
                  this.idProduct
                ).subscribe( (data: EditProductStore) =>{
                  console.log(data);

                  this.valorForm = data;
                  this.showImages = true;
                  this.showForm = true;

                  

                  console.log(this.valorForm.marks[0].name);


                  if( this.valorForm.images.length !== 0 ){
                    this.LengtImgEdit = data.images;

                    /// CARGAMOS LAS IMAGENES PARA MOSTRARLAS CUANDO EL PRODUCTO YA HA SIDO EDITADO ANTERIORMENTE //
                    if( this.LengtImgEdit.length > 1){
                      for( let i = 0; i < data.images.length; i++){
                        if(data.images[i].name !== "_"){
                          this.File.splice(i, 1, { image: `${URL}/${data.images[i].src_size.l}`, name: data.images[i].name, position: i + 1, id: data.images[i].pivot.image_id });
                          this.forma.patchValue({
                            file: this.File[i].image
                          });
                          this.exitLoadImg = true;
                          console.log('File', this.File);
                        }
                      }
                    }

                  }

                  // SET DE FORMULARIO //
                  this.forma.controls['name'].setValue(this.valorForm.name);
                  this.forma.controls['description'].setValue(this.valorForm.description);
                  
                  

                })



              } );



              // DECLARAMOS EL FORMULARIO //
              this.forma = new FormGroup({
                name: new FormControl('', [Validators.required, Validators.minLength(5)]),
                description: new FormControl('', [Validators.required, Validators.minLength(5)]),
                price: new FormControl('', [Validators.required, Validators.minLength(1)]),
                mark: new FormControl('Seleccionar'),
                factory: new FormControl('Seleccionar'),
                category: new FormControl('Seleccionar', [Validators.required]),
                subcategory_id: new FormControl('Seleccionar', [Validators.required]),
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
  }


    onChange(centroId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++){
      if ( this.category[i].name ===  centroId){
        this.bankService.GetSubcategoria(this.category[i].id)
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

  addProducts(){}

  Send(){

  }

}
