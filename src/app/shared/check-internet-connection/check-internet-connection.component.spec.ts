import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInternetConnectionComponent } from './check-internet-connection.component';

describe('CheckInternetConnectionComponent', () => {
  let component: CheckInternetConnectionComponent;
  let fixture: ComponentFixture<CheckInternetConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInternetConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInternetConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
