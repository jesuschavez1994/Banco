import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCardsStoreComponent } from './products-cards-store.component';

describe('ProductsCardsStoreComponent', () => {
  let component: ProductsCardsStoreComponent;
  let fixture: ComponentFixture<ProductsCardsStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCardsStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCardsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
