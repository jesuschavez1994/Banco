import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropZoneFileComponent } from './drag-drop-zone-file.component';

describe('DragDropZoneFileComponent', () => {
  let component: DragDropZoneFileComponent;
  let fixture: ComponentFixture<DragDropZoneFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropZoneFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropZoneFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
