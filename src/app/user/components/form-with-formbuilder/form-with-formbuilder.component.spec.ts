import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithFormbuilderComponent } from './form-with-formbuilder.component';

describe('FormWithFormbuilderComponent', () => {
  let component: FormWithFormbuilderComponent;
  let fixture: ComponentFixture<FormWithFormbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWithFormbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithFormbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
