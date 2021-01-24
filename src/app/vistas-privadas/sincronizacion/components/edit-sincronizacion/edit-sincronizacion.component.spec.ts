import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSincronizacionComponent } from './edit-sincronizacion.component';

describe('EditSincronizacionComponent', () => {
  let component: EditSincronizacionComponent;
  let fixture: ComponentFixture<EditSincronizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSincronizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
