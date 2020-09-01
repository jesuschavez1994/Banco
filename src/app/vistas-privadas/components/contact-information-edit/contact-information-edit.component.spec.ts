import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInformationEditComponent } from './contact-information-edit.component';

describe('ContactInformationEditComponent', () => {
  let component: ContactInformationEditComponent;
  let fixture: ComponentFixture<ContactInformationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInformationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
