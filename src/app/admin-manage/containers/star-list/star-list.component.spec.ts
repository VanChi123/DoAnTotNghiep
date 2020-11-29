import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarListComponent } from './star-list.component';

describe('StarListComponent', () => {
  let component: StarListComponent;
  let fixture: ComponentFixture<StarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
