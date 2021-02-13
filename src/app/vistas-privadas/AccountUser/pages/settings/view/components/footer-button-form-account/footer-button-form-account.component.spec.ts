import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterButtonFormAccountComponent } from './footer-button-form-account.component';

describe('FooterButtonFormAccountComponent', () => {
  let component: FooterButtonFormAccountComponent;
  let fixture: ComponentFixture<FooterButtonFormAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterButtonFormAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterButtonFormAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
