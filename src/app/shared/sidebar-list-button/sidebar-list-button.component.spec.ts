import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarListButtonComponent } from './sidebar-list-button.component';

describe('SidebarListButtonComponent', () => {
  let component: SidebarListButtonComponent;
  let fixture: ComponentFixture<SidebarListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarListButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
