import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { StoreService } from '../../../services/store/store.service';

@Component({
  selector: 'app-schedule-store',
  templateUrl: './schedule-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-store.component.css']
})
export class ScheduleStoreComponent implements OnInit {

  Day = [
    {
      dia: 'Lunes',
    },
    {
      dia: 'Martes',
    },
    {
      dia: 'Miercoles',
    },
    {
      dia: 'Jueves',
    },
    {
      dia: 'Viernes',
    },
    {
      dia: 'Sabado',
    },
    {
      dia: 'Domingo',
    }
  ];

  schedules: any[] = [];

  // tslint:disable-next-line: variable-name
  constructor(public _storeService: StoreService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this._storeService.GetShedule(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( response => {
        console.log('GET', response);
        this.schedules.push(response);
        console.log('Horario', this.schedules);
        this.changeDetector.markForCheck();
    });
  }

}
