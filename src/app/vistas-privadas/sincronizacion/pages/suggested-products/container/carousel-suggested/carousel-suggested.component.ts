import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Datum } from '../../../../../../interfaces/sincronizacion';
import { map } from 'rxjs/operators';
import { SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';


@Component({
  selector: 'app-carousel-suggested',
  templateUrl: './carousel-suggested.component.html',
  styleUrls: ['./carousel-suggested.component.css']
})
export class CarouselSuggestedComponent implements OnInit {

  @Input() item: Datum;
  @Output() idSugerencia: EventEmitter<any>;
  currentPosition = 0;

  constructor(public sincronizacion: SincronizacionService) { 
    this.idSugerencia = new EventEmitter();
  }

  ngOnInit(): void {
    console.log('ITEM CAROUSEL', this.item.data);

    this.item.data.map( ( i, index ) => {
      i.id = index;
      i.marginLeft = 0;
    });
    
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    this.item.data.find(i => i.id === 0).marginLeft = -100 * position;
    // console.log('currentPosition', this.currentPosition);
  }

  setNext() {

    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;

    console.log('nextPosition', nextPosition);
    if (nextPosition <= this.item.data.length - 1) {
      finalPercentage = -100 * nextPosition;
      console.log('finalPercentage', finalPercentage);
    } else {
      nextPosition = 0;
      console.log('nextPosition', nextPosition);
    }
    this.item.data.find(i => i.id === 0).marginLeft = finalPercentage;
    console.log('finalPercentage', finalPercentage);
    this.currentPosition = nextPosition;

    console.log('currentPosition', this.currentPosition);
  }


  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition  - 1;
    console.log('nextPosition', backPosition);
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.item.data.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.item.data.find(i => i.id === 0).marginLeft = finalPercentage;
    this.currentPosition = backPosition;

  }


  // SINCRONIZACION //
  sincronizar(){
    this.idSugerencia.emit(

      { idsuggested:this.item.data[this.currentPosition].bank_id,
        idproducto: this.item.product_id
      }
    );
  }
  

}
