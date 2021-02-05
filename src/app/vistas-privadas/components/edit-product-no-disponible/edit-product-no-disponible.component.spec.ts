import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductNoDisponibleComponent } from './edit-product-no-disponible.component';

describe('EditProductNoDisponibleComponent', () => {
  let component: EditProductNoDisponibleComponent;
  let fixture: ComponentFixture<EditProductNoDisponibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductNoDisponibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductNoDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
