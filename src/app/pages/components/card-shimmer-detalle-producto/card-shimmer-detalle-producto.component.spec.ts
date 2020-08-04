import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShimmerDetalleProductoComponent } from './card-shimmer-detalle-producto.component';

describe('CardShimmerDetalleProductoComponent', () => {
  let component: CardShimmerDetalleProductoComponent;
  let fixture: ComponentFixture<CardShimmerDetalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardShimmerDetalleProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShimmerDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
