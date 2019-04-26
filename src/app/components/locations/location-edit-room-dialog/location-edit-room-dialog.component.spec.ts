import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditRoomDialogComponent } from './location-edit-room-dialog.component';

describe('LocationEditRoomDialogComponent', () => {
  let component: LocationEditRoomDialogComponent;
  let fixture: ComponentFixture<LocationEditRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEditRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEditRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
