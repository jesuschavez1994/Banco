import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListProductComponent } from './item-list-product.component';

describe('ItemListProductComponent', () => {
  let component: ItemListProductComponent;
  let fixture: ComponentFixture<ItemListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
