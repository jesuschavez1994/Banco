import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperImgBannerComponent } from './cropper-img-banner.component';

describe('CropperImgBannerComponent', () => {
  let component: CropperImgBannerComponent;
  let fixture: ComponentFixture<CropperImgBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperImgBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperImgBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
