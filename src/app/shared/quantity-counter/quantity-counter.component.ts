import {
  Component, OnInit, ElementRef, Renderer2, ViewChild,
  Input, OnChanges, SimpleChanges, AfterViewInit, EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss']
})
export class QuantityCounterComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('inputQuantityCounter', {static: true}) inputQuantityCounter: ElementRef;
  @ViewChild('increaseControl') increaseControl: ElementRef;
  @ViewChild('decreaseControl') decreaseControl: ElementRef;


  @Input() isStrong = true;
  @Input() initValue = 1;
  @Input() value = 1;
  @Input() maxValue = 1;
  @Input() changeValue = 1;
  @Input() minValue = 1;
  @Output() currentValue = new EventEmitter<number>();

  constructor(private renderer: Renderer2 ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setEventsControls( this.increaseControl );
    this.setEventsControls( this.decreaseControl, true );
  }

  ngOnChanges(changes: SimpleChanges) {
    const inputNumber = this.inputQuantityCounter.nativeElement;
    this.renderer.setProperty(inputNumber, 'value', this.initValue);
    this.currentValue.emit(parseInt(inputNumber.value));

  }

  public setEventsControls( controlRef, isDecrease: boolean = false ){

    controlRef = controlRef.nativeElement;
    let  intervalChangeValue;

    controlRef.onclick = () => {
      this.changeCounterValue(isDecrease);
    };

    controlRef.onmousedown = () => {

      intervalChangeValue = setInterval( () => {

        this.changeCounterValue(isDecrease);

      },
        100
      );

    };

    controlRef.onmouseup = () => {
      clearInterval(intervalChangeValue);

    };

    document.onmouseup = () => {
      clearInterval(intervalChangeValue);

    };

    controlRef.onmouseout = () => {
      clearInterval(intervalChangeValue);

    };

  }

  public changeCounterValue(isDecrease: boolean = false ){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    let inputValue = parseInt( inputNumber.value );

    if ( !isDecrease && (inputValue < this.maxValue) ) {
      inputValue += this.changeValue;

    }else if ( isDecrease && (inputValue > this.minValue) ) {
      inputValue -= this.changeValue;

    }

    this.renderer.setProperty(inputNumber, 'value', inputValue);

    this.currentValue.emit(inputValue);

  }

  public validInputNumber() {

    const inputNumber = this.inputQuantityCounter.nativeElement;
    const inputValue = parseInt(inputNumber.value);

    if ( inputValue <= this.minValue ){
      this.renderer.setProperty(inputNumber, 'value', this.minValue);

    }else if ( inputValue > this.maxValue){
      this.renderer.setProperty(inputNumber, 'value', this.maxValue);

    }

    this.currentValue.emit(inputValue);

  }

}
