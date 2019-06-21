import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOpenUnavailibilityDialogComponent } from './location-open-unavailibility.component';

describe('LocationOpenUnavailibilityComponent', () => {
  let component: LocationOpenUnavailibilityDialogComponent;
  let fixture: ComponentFixture<LocationOpenUnavailibilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationOpenUnavailibilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOpenUnavailibilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
