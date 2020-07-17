import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataUsuarioComponent } from './form-data-usuario.component';

describe('FormDataUsuarioComponent', () => {
  let component: FormDataUsuarioComponent;
  let fixture: ComponentFixture<FormDataUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
