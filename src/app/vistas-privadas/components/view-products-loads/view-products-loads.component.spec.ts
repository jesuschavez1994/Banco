import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsLoadsComponent } from './view-products-loads.component';

describe('ViewProductsLoadsComponent', () => {
  let component: ViewProductsLoadsComponent;
  let fixture: ComponentFixture<ViewProductsLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductsLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
