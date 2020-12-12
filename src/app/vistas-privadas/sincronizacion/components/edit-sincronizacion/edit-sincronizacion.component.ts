import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductLoadingService } from '@services/product-loading/product-loading.service';
import { DetalleProduct, ImgLoad } from '@models/dataStore.model';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-sincronizacion',
  templateUrl: './edit-sincronizacion.component.html',
  styleUrls: ['./edit-sincronizacion.component.css']
})
export class EditSincronizacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
