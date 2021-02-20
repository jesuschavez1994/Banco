import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesincronizarComponent } from './desincronizar.component';

describe('DesincronizarComponent', () => {
  let component: DesincronizarComponent;
  let fixture: ComponentFixture<DesincronizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesincronizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesincronizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
