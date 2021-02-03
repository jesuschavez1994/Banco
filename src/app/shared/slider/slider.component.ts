import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }
  item1: any[]=[
    'assets/images/sliderHome/bannertipo1/1200x220.jpg',
    'assets/images/sliderHome/bannertipo1/768x300.jpg',
    'assets/images/sliderHome/bannertipo1/425x300.jpg',
    'assets/images/sliderHome/bannertipo1/325x300.jpg'
  ];
  item2: any[]=[
    'assets/images/sliderHome/bannertipo2/1200x220.jpg',
    'assets/images/sliderHome/bannertipo2/768x300.jpg',
    'assets/images/sliderHome/bannertipo2/425x300.jpg',
    'assets/images/sliderHome/bannertipo2/325x300.jpg'
  ];
  ngOnInit(): void {
  }

}
