import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaymentDialogComponent } from './product-payment-dialog.component';

describe('ProductPaymentDialogComponent', () => {
  let component: ProductPaymentDialogComponent;
  let fixture: ComponentFixture<ProductPaymentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPaymentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
