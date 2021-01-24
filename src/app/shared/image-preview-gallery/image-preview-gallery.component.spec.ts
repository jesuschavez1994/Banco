import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewGalleryComponent } from './image-preview-gallery.component';

describe('ImagePreviewGalleryComponent', () => {
  let component: ImagePreviewGalleryComponent;
  let fixture: ComponentFixture<ImagePreviewGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
