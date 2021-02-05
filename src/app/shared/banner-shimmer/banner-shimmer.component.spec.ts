import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerShimmerComponent } from './banner-shimmer.component';

describe('BannerShimmerComponent', () => {
  let component: BannerShimmerComponent;
  let fixture: ComponentFixture<BannerShimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerShimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
