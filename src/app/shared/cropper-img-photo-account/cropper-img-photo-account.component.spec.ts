import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperImgPhotoAccountComponent } from './cropper-img-photo-account.component';

describe('CropperImgPhotoAccountComponent', () => {
  let component: CropperImgPhotoAccountComponent;
  let fixture: ComponentFixture<CropperImgPhotoAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperImgPhotoAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperImgPhotoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
