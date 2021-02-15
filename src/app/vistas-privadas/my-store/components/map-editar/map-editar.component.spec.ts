import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapEditarComponent } from './map-editar.component';

describe('MapEditarComponent', () => {
  let component: MapEditarComponent;
  let fixture: ComponentFixture<MapEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
