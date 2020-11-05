import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '@services/store/store.service';
import { DataProductDB } from '@interfaces/InterfaceProducto';

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

  constructor(private cd: ChangeDetectorRef, public storeService: StoreService) { }

  ngOnInit() {
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

}
