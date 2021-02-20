import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadProductComponent } from './load-product.component';

describe('LoadProductComponent', () => {
  let component: LoadProductComponent;
  let fixture: ComponentFixture<LoadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
