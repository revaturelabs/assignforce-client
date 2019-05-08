import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteBuildingDialogComponent } from './location-delete-building-dialog.component';

describe('LocationDeleteBuildingDialogComponent', () => {
  let component: LocationDeleteBuildingDialogComponent;
  let fixture: ComponentFixture<LocationDeleteBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteBuildingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
