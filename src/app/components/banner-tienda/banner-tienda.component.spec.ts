import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTiendaComponent } from './banner-tienda.component';

describe('BannerTiendaComponent', () => {
  let component: BannerTiendaComponent;
  let fixture: ComponentFixture<BannerTiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerTiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
