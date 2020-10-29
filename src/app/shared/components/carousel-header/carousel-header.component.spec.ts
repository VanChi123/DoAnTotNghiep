import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHeaderComponent } from './carousel-header.component';

describe('CarouselHeaderComponent', () => {
  let component: CarouselHeaderComponent;
  let fixture: ComponentFixture<CarouselHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
