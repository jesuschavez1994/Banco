import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBanckProductAdminComponent } from './form-banck-product-admin.component';

describe('FormBanckProductAdminComponent', () => {
  let component: FormBanckProductAdminComponent;
  let fixture: ComponentFixture<FormBanckProductAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBanckProductAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBanckProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
