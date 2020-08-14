import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomGoogleSesionComponent } from './buttom-google-sesion.component';

describe('ButtomGoogleSesionComponent', () => {
  let component: ButtomGoogleSesionComponent;
  let fixture: ComponentFixture<ButtomGoogleSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomGoogleSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomGoogleSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
