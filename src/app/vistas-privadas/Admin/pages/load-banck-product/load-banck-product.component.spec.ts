import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBanckProductComponent } from './load-banck-product.component';

describe('LoadBanckProductComponent', () => {
  let component: LoadBanckProductComponent;
  let fixture: ComponentFixture<LoadBanckProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBanckProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBanckProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
