import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSuggestedProductsComponent } from './items-suggested-products.component';

describe('ItemsSuggestedProductsComponent', () => {
  let component: ItemsSuggestedProductsComponent;
  let fixture: ComponentFixture<ItemsSuggestedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSuggestedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSuggestedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
