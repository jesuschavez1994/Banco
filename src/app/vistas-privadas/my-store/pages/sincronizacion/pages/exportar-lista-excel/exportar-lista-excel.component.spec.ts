import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarListaExcelComponent } from './exportar-lista-excel.component';

describe('ExportarListaExcelComponent', () => {
  let component: ExportarListaExcelComponent;
  let fixture: ComponentFixture<ExportarListaExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportarListaExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarListaExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
