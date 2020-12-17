import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideFiltrosComponent } from './aside-filtros.component';

describe('AsideFiltrosComponent', () => {
  let component: AsideFiltrosComponent;
  let fixture: ComponentFixture<AsideFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
