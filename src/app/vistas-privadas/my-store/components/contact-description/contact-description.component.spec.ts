import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDescriptionComponent } from './contact-description.component';

describe('ContactDescriptionComponent', () => {
  let component: ContactDescriptionComponent;
  let fixture: ComponentFixture<ContactDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
