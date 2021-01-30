import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSynchronizedProductsComponent } from './no-synchronized-products.component';

describe('NoSynchronizedProductsComponent', () => {
  let component: NoSynchronizedProductsComponent;
  let fixture: ComponentFixture<NoSynchronizedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSynchronizedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSynchronizedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
