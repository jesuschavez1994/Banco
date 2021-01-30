import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCategoriasAndSubcategoriasComponent } from './modal-add-categorias-and-subcategorias.component';

describe('ModalAddCategoriasAndSubcategoriasComponent', () => {
  let component: ModalAddCategoriasAndSubcategoriasComponent;
  let fixture: ComponentFixture<ModalAddCategoriasAndSubcategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddCategoriasAndSubcategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddCategoriasAndSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
