import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AProductListComponent } from './a-product-list.component';

describe('AProductListComponent', () => {
  let component: AProductListComponent;
  let fixture: ComponentFixture<AProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
