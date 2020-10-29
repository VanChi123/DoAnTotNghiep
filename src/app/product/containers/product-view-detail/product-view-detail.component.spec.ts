import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewDetailComponent } from './product-view-detail.component';

describe('ProductViewDetailComponent', () => {
  let component: ProductViewDetailComponent;
  let fixture: ComponentFixture<ProductViewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
