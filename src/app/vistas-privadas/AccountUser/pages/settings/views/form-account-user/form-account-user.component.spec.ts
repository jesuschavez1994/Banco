import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccountUserComponent } from './form-account-user.component';

describe('FormAccountUserComponent', () => {
  let component: FormAccountUserComponent;
  let fixture: ComponentFixture<FormAccountUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAccountUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
