import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronizedProductsTableComponent } from './synchronized-products-table.component';

describe('SynchronizedProductsTableComponent', () => {
  let component: SynchronizedProductsTableComponent;
  let fixture: ComponentFixture<SynchronizedProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynchronizedProductsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronizedProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
