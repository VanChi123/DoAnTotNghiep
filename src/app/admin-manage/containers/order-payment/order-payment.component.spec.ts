import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentComponent } from './order-payment.component';

describe('OrderPaymentComponent', () => {
  let component: OrderPaymentComponent;
  let fixture: ComponentFixture<OrderPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
