import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteLocationDialogComponent } from './location-delete-location-dialog.component';

describe('LocationDeleteLocationDialogComponent', () => {
  let component: LocationDeleteLocationDialogComponent;
  let fixture: ComponentFixture<LocationDeleteLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
