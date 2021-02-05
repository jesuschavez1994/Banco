import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarListShimmerComponent } from './sidebar-list-shimmer.component';

describe('SidebarListShimmerComponent', () => {
  let component: SidebarListShimmerComponent;
  let fixture: ComponentFixture<SidebarListShimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarListShimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarListShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
