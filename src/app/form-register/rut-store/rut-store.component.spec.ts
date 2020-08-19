import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutStoreComponent } from './rut-store.component';

describe('RutStoreComponent', () => {
  let component: RutStoreComponent;
  let fixture: ComponentFixture<RutStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
