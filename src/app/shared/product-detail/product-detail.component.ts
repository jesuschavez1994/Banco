import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {

  productSelected = {
    imgs: [
      'assets/img/test-img/organic_protein.jpg',
      'assets/img/test-img/magazine_vegan_food.jpg',
      'assets/img/test-img/banner.png'
    ]
  };

  @ViewChild('inputQuantityCounter') inputQuantityCounter: ElementRef;

  constructor( private renderer: Renderer2 ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.changeCounterValue( this.inputQuantityCounter );
  }

  public changeCounterValue(
    maxValue: number, isDecrease: boolean = false,
    minValue: number = 0, changeValue: number = 1,
    valueToInit: number = 1 ){

    const inputNumber = this.inputQuantityCounter.nativeElement;
    let inputValue = parseInt( inputNumber.value );

    if ( valueToInit > 1){
      inputValue = valueToInit;
    }

    if ( !isDecrease && (inputValue < maxValue) ) {
      inputValue += changeValue;

    }else if ( isDecrease && (inputValue > 0) ) {
      inputValue -= changeValue;

    }

    this.renderer.setProperty(inputNumber, 'value', inputValue);

  }

  public fillWithCeroInputNumber(){
    const inputNumber = this.inputQuantityCounter.nativeElement;
    const inputValue = inputNumber.value;

    if (inputValue === ''){
      this.renderer.setProperty(inputNumber, 'value', 0);
    }

  }

  public validInputNumber(maxValue: number, minValue: number = 0){
    const inputNumber = this.inputQuantityCounter.nativeElement;
    const inputValue = parseInt(inputNumber.value);

    if ( isNaN(inputValue) ){
      this.renderer.setProperty(inputNumber, 'value', 0);

    }else if ( inputValue <= minValue ){
      this.renderer.setProperty(inputNumber, 'value', minValue);

    }else if ( inputValue > maxValue){
      this.renderer.setProperty(inputNumber, 'value', maxValue);

    }

  }

}
