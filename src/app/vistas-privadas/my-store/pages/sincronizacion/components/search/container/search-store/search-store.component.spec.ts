import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStoreComponent } from './search-store.component';

describe('SearchStoreComponent', () => {
  let component: SearchStoreComponent;
  let fixture: ComponentFixture<SearchStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
