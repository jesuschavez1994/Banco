import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { DataProductDB } from '../../../../interfaces/InterfaceProducto';
import { StoreService } from '../../../../services/store/store.service';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDeleteProductComponent } from '../../../components/view-products-loads/container/modal-delete-product/modal-delete-product.component'

@Component({
  selector: 'app-products-cards-store',
  templateUrl: './products-cards-store.component.html',
  styleUrls: ['./products-cards-store.component.scss']
})
export class ProductsCardsStoreComponent implements OnInit {

  // PARAMETROS //
  // p = 1;
  // id: string;

  // ENTADAS //
  // @Input() itemsPerPage = 16;
  // @Input() totalItems: number;
  // @Input() products: ProductsCardsOptions[] = [];
  // @Input() MyProduct: DataProductDB;
  // @Input() showShimmer = true;

  // SALIDAS //
  // @Output() pagination = new EventEmitter<number>();

  // constructor(private cd: ChangeDetectorRef,
  //             public storeService: StoreService,
  //             public dialog: MatDialog) { }

  // ngOnInit(): void {
  // }

  // public Id(index){
  //   console.log(index);
  //   console.log(this.MyProduct[index].id);
  //   return this.id = this.MyProduct[index].id;
  // }

  // public refresh(){
  //   this.cd.detectChanges();
  // }

  // public Delete(index: number){
  //   console.log(index);
  //   this.storeService.DeleteProduct(
  //     localStorage.getItem('id'),
  //     localStorage.getItem('storeId'),
  //     this.MyProduct[index].id
  //   ).subscribe();
  // }

  // public pageChanged(event) {
  //   this.p = event;
  //   this.pagination.emit(this.p);
  // }

  // openDialog(index: number): void {
  //   const dialogRef = this.dialog.open(ModalDeleteProductComponent, {
  //     width: '350px',
  //     data: {
  //       indexProductoDelete: index,
  //       idProducto: this.MyProduct[index].id
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //   });

  // }

  // public toggleShimmer(show = true) {
  //   this.showShimmer = show;
  // }


  p = 1;
  @Input() itemsPerPage = 16;
  @Input() totalItems: number;
  @Input() products: ProductsCardsOptions[] = [];
  @Input() showShimmer = true;

  @Output() selected = new EventEmitter<ProductsCardsOptions>();
  @Output() pagination = new EventEmitter<number>();



  constructor(

  ) { }

  ngOnInit(): void {
  }

  public selectedProduct(product: ProductsCardsOptions){
    this.selected.emit(product);
  }


  public pageChanged(event) {
    this.p = event;

    this.pagination.emit(this.p);

  }

  public toggleShimmer(show = true) {
    this.showShimmer = show;
  }

}
