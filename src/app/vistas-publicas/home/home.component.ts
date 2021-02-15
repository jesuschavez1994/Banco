import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import {HomeServiceService} from '../services/home-service.service';

import { CategoriesHome } from "@interfaces/homeProduct.interface";
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalErrComponent} from '@shared/modal-err/modal-err.component';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalRegister') modalRegister: ElementRef;
    userLog: boolean;
    storeLog: boolean | string;

  constructor(  private homeService: HomeServiceService,

                private spinner: NgxSpinnerService,
                private modal: MatDialog) {


                }
// ATRIBUTOS
  homeComp: CategoriesHome[];
  requestReady = false;
// METODOS
  ngOnInit() {
    console.log('on init ');
    // this.storeService.ProductGet(
    //   localStorage.getItem('id'),
    //   localStorage.getItem('storeId'))
    //   .subscribe( (resp: ProductosLoads) => {
    //   this.itemProductos = resp.data;
    //   console.log('ITEM', this.itemProductos);
    // });
    this.spinner.show();
    this.userLog = this.homeService.islog();
    this.storeLog = this.homeService.storeActive();
    console.log('loggin', this.userLog);
    this.homeService.obtProducts().subscribe(
      data => {
        console.log('request', data);
        this.spinner.hide();
        this.requestReady = true;
        this.homeComp = data;
      },
         err => {
          console.log('err');
          this.spinner.hide();
          this.openDialog('Ha ocurrido un error en la carga de productos, vuelva a intentar')
      });
    }
  openDialog(mensaje: string): void {
    const dialogRef = this.modal.open(ModalErrComponent, {
      data: {title: 'Oops!', description: mensaje}
    });
  }
}
