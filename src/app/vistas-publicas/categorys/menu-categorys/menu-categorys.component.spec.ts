import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategorysComponent } from './menu-categorys.component';

describe('MenuCategorysComponent', () => {
  let component: MenuCategorysComponent;
  let fixture: ComponentFixture<MenuCategorysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCategorysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
