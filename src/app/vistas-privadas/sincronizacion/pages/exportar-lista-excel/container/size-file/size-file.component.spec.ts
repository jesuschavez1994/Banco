import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeFileComponent } from './size-file.component';

describe('SizeFileComponent', () => {
  let component: SizeFileComponent;
  let fixture: ComponentFixture<SizeFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
