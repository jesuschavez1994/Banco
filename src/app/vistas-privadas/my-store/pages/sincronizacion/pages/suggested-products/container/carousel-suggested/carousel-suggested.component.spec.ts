import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSuggestedComponent } from './carousel-suggested.component';

describe('CarouselSuggestedComponent', () => {
  let component: CarouselSuggestedComponent;
  let fixture: ComponentFixture<CarouselSuggestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSuggestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSuggestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
