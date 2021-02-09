import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzonePhotoComponent } from './dropzone-photo.component';

describe('DropzonePhotoComponent', () => {
  let component: DropzonePhotoComponent;
  let fixture: ComponentFixture<DropzonePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropzonePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzonePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
