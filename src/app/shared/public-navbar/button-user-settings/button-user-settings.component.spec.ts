import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUserSettingsComponent } from './button-user-settings.component';

describe('ButtonUserSettingsComponent', () => {
  let component: ButtonUserSettingsComponent;
  let fixture: ComponentFixture<ButtonUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
