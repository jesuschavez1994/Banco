import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { Sugerir } from '@models/sincronizacion/sugerir';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css']
})
export class SuggestedProductsComponent implements OnInit {


  forma: FormGroup;

  constructor(public sincronizacion: SincronizacionService) {


    this.forma = new FormGroup({
      id: new FormControl(''),
    });

  }

// tslint:disable-next-line: member-ordering
task: Task = {
  name: 'Indeterminate',
  completed: false,
  color: 'primary',
  subtasks: [
    {name: 'Primary', completed: false, color: 'primary'},
    {name: 'Accent', completed: false, color: 'accent'},
    {name: 'Warn', completed: false, color: 'warn'}
  ]
};

  allComplete = false;

  ngOnInit(): void {
  }

  solicitarSugerencias(){

    const id = new Sugerir(
      localStorage.getItem('storeId'),
    );

    this.sincronizacion.Sugerir(localStorage.getItem('storeId'), id).subscribe( resp => {
      console.log(resp);
    });
  }

  sugerir(){
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    console.log(this.allComplete);
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

}
