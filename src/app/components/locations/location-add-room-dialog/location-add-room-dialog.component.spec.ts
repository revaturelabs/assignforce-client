import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddRoomDialogComponent } from './location-add-room-dialog.component';

describe('LocationAddRoomDialogComponent', () => {
  let component: LocationAddRoomDialogComponent;
  let fixture: ComponentFixture<LocationAddRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAddRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
