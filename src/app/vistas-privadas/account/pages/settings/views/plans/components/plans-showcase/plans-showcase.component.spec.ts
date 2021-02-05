import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansShowcaseComponent } from './plans-showcase.component';

describe('PlansShowcaseComponent', () => {
  let component: PlansShowcaseComponent;
  let fixture: ComponentFixture<PlansShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
