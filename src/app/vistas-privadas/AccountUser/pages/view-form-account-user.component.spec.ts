import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormAccountUserComponent } from './view-form-account-user.component';

describe('ViewFormAccountUserComponent', () => {
  let component: ViewFormAccountUserComponent;
  let fixture: ComponentFixture<ViewFormAccountUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFormAccountUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
