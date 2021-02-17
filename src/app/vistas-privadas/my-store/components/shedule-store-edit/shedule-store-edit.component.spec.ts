import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleStoreEditComponent } from './shedule-store-edit.component';

describe('SheduleStoreEditComponent', () => {
  let component: SheduleStoreEditComponent;
  let fixture: ComponentFixture<SheduleStoreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheduleStoreEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheduleStoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
