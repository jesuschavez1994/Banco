import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizedProductsComponent } from './synchronized-products.component';

describe('SynchronizedProductsComponent', () => {
  let component: SynchronizedProductsComponent;
  let fixture: ComponentFixture<SynchronizedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchronizedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronizedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
