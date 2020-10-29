import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHeaderComponent } from './type-header.component';

describe('TypeHeaderComponent', () => {
  let component: TypeHeaderComponent;
  let fixture: ComponentFixture<TypeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
