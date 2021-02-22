import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSynchronizedComponent } from './dialog-synchronized.component';

describe('DialogSynchronizedComponent', () => {
  let component: DialogSynchronizedComponent;
  let fixture: ComponentFixture<DialogSynchronizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSynchronizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSynchronizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
