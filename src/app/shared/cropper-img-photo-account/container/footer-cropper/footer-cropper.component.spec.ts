import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCropperComponent } from './footer-cropper.component';

describe('FooterCropperComponent', () => {
  let component: FooterCropperComponent;
  let fixture: ComponentFixture<FooterCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
