import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShimmerTableInformacionComponent } from './card-shimmer-table-informacion.component';

describe('CardShimmerTableInformacionComponent', () => {
  let component: CardShimmerTableInformacionComponent;
  let fixture: ComponentFixture<CardShimmerTableInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardShimmerTableInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShimmerTableInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
