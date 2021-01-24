import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCategoryComponent } from './slider-category.component';

describe('SliderCategoryComponent', () => {
  let component: SliderCategoryComponent;
  let fixture: ComponentFixture<SliderCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
