import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditLocationDialogComponent } from './location-edit-location-dialog.component';

describe('LocationEditLocationDialogComponent', () => {
  let component: LocationEditLocationDialogComponent;
  let fixture: ComponentFixture<LocationEditLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
