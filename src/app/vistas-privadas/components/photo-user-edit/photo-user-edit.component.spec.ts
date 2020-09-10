import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUserEditComponent } from './photo-user-edit.component';

describe('PhotoUserEditComponent', () => {
  let component: PhotoUserEditComponent;
  let fixture: ComponentFixture<PhotoUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
