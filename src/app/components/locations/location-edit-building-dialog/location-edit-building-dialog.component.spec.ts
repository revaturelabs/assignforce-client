import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditBuildingDialogComponent } from './location-edit-building-dialog.component';

describe('LocationEditBuildingDialogComponent', () => {
  let component: LocationEditBuildingDialogComponent;
  let fixture: ComponentFixture<LocationEditBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditBuildingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
