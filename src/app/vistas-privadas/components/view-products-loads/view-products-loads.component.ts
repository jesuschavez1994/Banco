import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../../services/store/store.service';

@Component({
  selector: 'app-view-products-loads',
  templateUrl: './view-products-loads.component.html',
  styleUrls: ['./view-products-loads.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductsLoadsComponent implements OnInit {

  // @Input() producto: any = {};
  // @Input() data: string[];

  // tslint:disable-next-line: ban-types
  showCards = false;

  constructor(private cd: ChangeDetectorRef, public storeService: StoreService) { }

  ngOnInit() {
  }

}