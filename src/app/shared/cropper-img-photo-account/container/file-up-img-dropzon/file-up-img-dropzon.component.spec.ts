import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUpImgDropzonComponent } from './file-up-img-dropzon.component';

describe('FileUpImgDropzonComponent', () => {
  let component: FileUpImgDropzonComponent;
  let fixture: ComponentFixture<FileUpImgDropzonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUpImgDropzonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUpImgDropzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
