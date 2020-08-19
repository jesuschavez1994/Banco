import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutStoreGoogleComponent } from './rut-store-google.component';

describe('RutStoreGoogleComponent', () => {
  let component: RutStoreGoogleComponent;
  let fixture: ComponentFixture<RutStoreGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutStoreGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutStoreGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
