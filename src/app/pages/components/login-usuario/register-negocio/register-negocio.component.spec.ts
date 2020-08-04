import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNegocioComponent } from './register-negocio.component';

describe('RegisterNegocioComponent', () => {
  let component: RegisterNegocioComponent;
  let fixture: ComponentFixture<RegisterNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
