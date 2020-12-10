import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { BankProductService } from '../../../../services/bank-product.service';
import { ImgLoad } from '@models/dataStore.model';


class BankProduct {

  constructor(
      public name?: string,
      public description?: string,
      public mark?: string,
      public factory?: string,
      public subcategory_id?: string,
  ) { }

}

@Component({
  selector: 'app-form-banck-product-admin',
  templateUrl: './form-banck-product-admin.component.html',
  styleUrls: ['./form-banck-product-admin.component.css']
})
export class FormBanckProductAdminComponent implements OnInit {

  forma: FormGroup;
  hover = false;
  icon = false;
  category: any;
  subcategory: any;
  marks: any;
  factories: any;

  File: any[] =
  [
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null},
    {image: null, name: null, position: null}
  ];

  constructor(private _cd: ChangeDetectorRef, public _productLoadingService: ProductLoadingService, private _bankService: BankProductService) { 

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl(''),
      mark: new FormControl('Seleccionar'),
      factory: new FormControl('Seleccionar'),
      category: new FormControl('Seleccionar', [Validators.required]),
      subcategory_id: new FormControl('Seleccionar', [Validators.required]),
      delivery: new FormControl('Seleccionar'),
      aviable: new FormControl('Seleccionar'),
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

    // GET FABRICANTE //
    this._productLoadingService.GetFactories(
      localStorage.getItem('id'))
      .subscribe( response => {
      console.log('factories', response);
      this.factories = response;
    });

    this._productLoadingService.GetMark(
      localStorage.getItem('id'))
      .subscribe( response => {
      this.marks = response;
      console.log(this.marks);
    });

  }

  addProducts(){

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

  Send(){

    const data = new BankProduct(
      this.forma.value.name,
      this.forma.value.description,
      this.forma.value.mark,
      this.forma.value.factory,
      this.forma.value.subcategory_id
    );

    const images = new ImgLoad(
      this.File
    );

    console.log(data);

    this._bankService.BancoDeProductosFounduss(localStorage.getItem('id'), data).subscribe( (resp: any) => {
      console.log(resp);
      this._bankService.BancoImagesProducto(localStorage.getItem('id'), resp.id, images).subscribe( resp => {
        console.log(resp);
      })
    });

    

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

}
