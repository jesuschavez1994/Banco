import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataNegocioComponent } from './form-data-negocio.component';

describe('FormDataNegocioComponent', () => {
  let component: FormDataNegocioComponent;
  let fixture: ComponentFixture<FormDataNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
