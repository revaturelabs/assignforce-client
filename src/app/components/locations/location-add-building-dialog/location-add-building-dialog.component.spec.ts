import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddBuildingDialogComponent } from './location-add-building-dialog.component';

describe('LocationAddBuildingDialogComponent', () => {
  let component: LocationAddBuildingDialogComponent;
  let fixture: ComponentFixture<LocationAddBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAddBuildingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
