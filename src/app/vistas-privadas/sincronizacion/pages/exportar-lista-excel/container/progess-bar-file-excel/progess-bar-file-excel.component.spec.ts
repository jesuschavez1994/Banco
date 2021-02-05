import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgessBarFileExcelComponent } from './progess-bar-file-excel.component';

describe('ProgessBarFileExcelComponent', () => {
  let component: ProgessBarFileExcelComponent;
  let fixture: ComponentFixture<ProgessBarFileExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgessBarFileExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgessBarFileExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
