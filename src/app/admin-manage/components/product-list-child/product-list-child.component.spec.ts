import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListChildComponent } from './product-list-child.component';

describe('ProductListChildComponent', () => {
  let component: ProductListChildComponent;
  let fixture: ComponentFixture<ProductListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
