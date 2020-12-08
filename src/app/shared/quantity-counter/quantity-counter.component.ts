import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { QuantityCounterOptions } from '@interfaces/components-options/quantity-counter.interface';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss']
})
export class QuantityCounterComponent implements OnInit {

  @ViewChild('inputQuantityCounter') inputQuantityCounter: ElementRef;
  @Input() isStrong = true;
  @Input() counter: QuantityCounterOptions = {
    maxValue: 1,
    initValue: 1,
    changeValue: 1,
    minValue: 1,
  };

  constructor(private renderer: Renderer2 ) { }

  ngOnInit(): void {
  }

  public changeCounterValue( isDecrease: boolean = false){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    let inputValue = parseInt( inputNumber.value );

    if ( !isDecrease && (inputValue < this.counter.maxValue) ) {
      inputValue += this.counter.changeValue;

    }else if ( isDecrease && (inputValue > this.counter.minValue) ) {
      inputValue -= this.counter.changeValue;

    }

    this.renderer.setProperty(inputNumber, 'value', inputValue);

  }

  public validInputNumber(){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    const inputValue = parseInt(inputNumber.value);

    if ( isNaN(inputValue) ){
      this.renderer.setProperty(inputNumber, 'value', this.counter.minValue);

    }else if ( inputValue <= this.counter.minValue ){
      this.renderer.setProperty(inputNumber, 'value', this.counter.minValue);

    }else if ( inputValue > this.counter.maxValue){
      this.renderer.setProperty(inputNumber, 'value', this.counter.maxValue);

    }

  }

}
