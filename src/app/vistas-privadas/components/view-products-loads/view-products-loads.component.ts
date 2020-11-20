import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '@services/store/store.service';
import { DataProductDB } from '@interfaces/InterfaceProducto';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDeleteProductComponent } from './container/modal-delete-product/modal-delete-product.component';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-view-products-loads',
  templateUrl: './view-products-loads.component.html',
  styleUrls: ['./view-products-loads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductsLoadsComponent implements OnInit {


  @Input() index: number;
  @Input() item: DataProductDB;
  @Input() MyProduct: DataProductDB;
  // tslint:disable-next-line: no-inferrable-types
  oculto: number = 100;

  // tslint:disable-next-line: ban-types
  showCards = false;
  indexProductoDelete: any;
  idProducto: any;
  id: string;

  constructor(private cd: ChangeDetectorRef,
              public dialog: MatDialog,
              public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  Id(index){
    console.log(index);
    console.log(this.MyProduct[index].id);
    return this.id = this.MyProduct[index].id;
  }

  refresh(){
    this.cd.detectChanges();
  }

  Delete(index: number){
    console.log(index);
    this.storeService.DeleteProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.MyProduct[index].id
    ).subscribe();
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ModalDeleteProductComponent, {
      width: '250px',
      data: {
        indexProductoDelete: index,
        idProducto: this.MyProduct[index].id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

  }


}
