import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductBankComponent } from './edit-product-bank.component';

describe('EditProductBankComponent', () => {
  let component: EditProductBankComponent;
  let fixture: ComponentFixture<EditProductBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
