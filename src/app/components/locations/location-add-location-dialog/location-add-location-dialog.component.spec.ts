import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddLocationDialogComponent } from './location-add-location-dialog.component';

describe('LocationAddLocationDialogComponent', () => {
  let component: LocationAddLocationDialogComponent;
  let fixture: ComponentFixture<LocationAddLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAddLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
