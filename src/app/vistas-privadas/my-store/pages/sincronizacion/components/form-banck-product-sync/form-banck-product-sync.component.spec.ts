import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBanckProductSyncComponent } from './form-banck-product-sync.component';

describe('FormBanckProductSyncComponent', () => {
  let component: FormBanckProductSyncComponent;
  let fixture: ComponentFixture<FormBanckProductSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBanckProductSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBanckProductSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
