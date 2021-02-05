import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProductComponent } from './bank-product.component';

describe('BankProductComponent', () => {
  let component: BankProductComponent;
  let fixture: ComponentFixture<BankProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
