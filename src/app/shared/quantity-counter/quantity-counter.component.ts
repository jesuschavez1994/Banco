import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { QuantityCounterOptions } from '@interfaces/components-options/quantity-counter.option.interface';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss']
})
export class QuantityCounterComponent implements OnInit {

  @ViewChild('inputQuantityCounter') inputQuantityCounter: ElementRef;
  @Input() isStrong = true;
  @Input() maxValue = 1;
  @Input() initValue = 1;
  @Input() changeValue = 1;
  @Input() minValue = 1;

  // @Input() counter: QuantityCounterOptions = {
  //   maxValue: this.maxValue,
  //   initValue: this.initValue,
  //   changeValue: this.changeValue,
  //   minValue: this.minValue,
  // };

  constructor(private renderer: Renderer2 ) { }

  ngOnInit(): void {
  }

  public changeCounterValue( isDecrease: boolean = false){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    let inputValue = parseInt( inputNumber.value );

    if ( !isDecrease && (inputValue < this.maxValue) ) {
      inputValue += this.changeValue;

    }else if ( isDecrease && (inputValue > this.minValue) ) {
      inputValue -= this.changeValue;

    }

    this.renderer.setProperty(inputNumber, 'value', inputValue);

  }

  public validInputNumber(){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    const inputValue = parseInt(inputNumber.value);

    if ( isNaN(inputValue) ){
      this.renderer.setProperty(inputNumber, 'value', this.minValue);

    }else if ( inputValue <= this.minValue ){
      this.renderer.setProperty(inputNumber, 'value', this.minValue);

    }else if ( inputValue > this.maxValue){
      this.renderer.setProperty(inputNumber, 'value', this.maxValue);

    }

  }

}
