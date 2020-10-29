import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AProductFormComponent } from './a-product-form.component';

describe('AProductFormComponent', () => {
  let component: AProductFormComponent;
  let fixture: ComponentFixture<AProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
