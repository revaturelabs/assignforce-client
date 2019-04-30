import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOpenUnavailibilityComponent } from './location-open-unavailibility.component';

describe('LocationOpenUnavailibilityComponent', () => {
  let component: LocationOpenUnavailibilityComponent;
  let fixture: ComponentFixture<LocationOpenUnavailibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOpenUnavailibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOpenUnavailibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
