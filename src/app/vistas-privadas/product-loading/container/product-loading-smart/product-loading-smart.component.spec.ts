import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLoadingSmartComponent } from './product-loading-smart.component';

describe('ProductLoadingSmartComponent', () => {
  let component: ProductLoadingSmartComponent;
  let fixture: ComponentFixture<ProductLoadingSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLoadingSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoadingSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
