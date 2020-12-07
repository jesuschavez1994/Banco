import { Component, OnInit, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { DialogSynchronizedComponent } from '../dialog-synchronized/dialog-synchronized.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-tablero-de-sincronizacion',
  templateUrl: './tablero-de-sincronizacion.component.html',
  styleUrls: ['./tablero-de-sincronizacion.component.css']
})
export class TableroDeSincronizacionComponent implements OnInit {

  @Input() index: string;
  @Input() bank_id: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

  allComplete: boolean = false;

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
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  sincronizarThis(){
    console.log('Index', this.index);
  }

  sincronizar(){
    const dialogRef = this.dialog.open(DialogSynchronizedComponent, {
      width: '250px',
      data: {index: this.index, Bank_id: this.bank_id}
    });
  }

}
