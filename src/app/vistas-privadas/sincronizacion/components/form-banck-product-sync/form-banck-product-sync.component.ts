import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';

@Component({
  selector: 'app-form-banck-product-sync',
  templateUrl: './form-banck-product-sync.component.html',
  styleUrls: ['./form-banck-product-sync.component.css']
})
export class FormBanckProductSyncComponent implements OnInit {

  forma: FormGroup;

  constructor(public _productLoadingService: ProductLoadingService) { 

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required]),
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
  }

  addProducts(){}

}
