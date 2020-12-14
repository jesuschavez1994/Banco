import { Component, OnInit, EventEmitter,  Output } from '@angular/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { Sugerir } from '@models/sincronizacion/sugerir';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { Total } from '@interfaces/sincronizacion';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() public searchEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => this.searchEmitter.emit(value));
  }

  public search = new FormControl('');

}
