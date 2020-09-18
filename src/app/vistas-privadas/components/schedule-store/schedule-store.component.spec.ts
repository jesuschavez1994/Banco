import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStoreComponent } from './schedule-store.component';

describe('ScheduleStoreComponent', () => {
  let component: ScheduleStoreComponent;
  let fixture: ComponentFixture<ScheduleStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
