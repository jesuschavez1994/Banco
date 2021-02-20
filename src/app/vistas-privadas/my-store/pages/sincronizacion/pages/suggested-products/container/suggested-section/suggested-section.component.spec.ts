import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedSectionComponent } from './suggested-section.component';

describe('SuggestedSectionComponent', () => {
  let component: SuggestedSectionComponent;
  let fixture: ComponentFixture<SuggestedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
