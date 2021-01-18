import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBComponent } from './invoice-b.component';

describe('InvoiceBComponent', () => {
  let component: InvoiceBComponent;
  let fixture: ComponentFixture<InvoiceBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
