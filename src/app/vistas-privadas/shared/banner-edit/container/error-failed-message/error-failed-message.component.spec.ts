import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFailedMessageComponent } from './error-failed-message.component';

describe('ErrorFailedMessageComponent', () => {
  let component: ErrorFailedMessageComponent;
  let fixture: ComponentFixture<ErrorFailedMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorFailedMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorFailedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
