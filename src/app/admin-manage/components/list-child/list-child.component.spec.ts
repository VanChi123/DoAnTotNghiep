import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChildComponent } from './list-child.component';

describe('ListChildComponent', () => {
  let component: ListChildComponent;
  let fixture: ComponentFixture<ListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
