import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSuggestedProductsComponent } from './no-suggested-products.component';

describe('NoSuggestedProductsComponent', () => {
  let component: NoSuggestedProductsComponent;
  let fixture: ComponentFixture<NoSuggestedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSuggestedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSuggestedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
