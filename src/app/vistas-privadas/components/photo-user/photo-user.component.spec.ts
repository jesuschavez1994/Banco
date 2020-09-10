import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUserComponent } from './photo-user.component';

describe('PhotoUserComponent', () => {
  let component: PhotoUserComponent;
  let fixture: ComponentFixture<PhotoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
