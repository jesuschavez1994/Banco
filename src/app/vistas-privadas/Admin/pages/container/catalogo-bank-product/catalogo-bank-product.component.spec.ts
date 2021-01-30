import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoBankProductComponent } from './catalogo-bank-product.component';

describe('CatalogoBankProductComponent', () => {
  let component: CatalogoBankProductComponent;
  let fixture: ComponentFixture<CatalogoBankProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoBankProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoBankProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
