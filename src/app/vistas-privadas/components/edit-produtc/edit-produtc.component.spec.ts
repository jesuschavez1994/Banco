import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdutcComponent } from './edit-produtc.component';

describe('EditProdutcComponent', () => {
  let component: EditProdutcComponent;
  let fixture: ComponentFixture<EditProdutcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProdutcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdutcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
