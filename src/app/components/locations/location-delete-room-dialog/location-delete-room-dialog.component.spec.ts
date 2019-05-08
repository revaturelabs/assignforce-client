import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDeleteRoomDialogComponent } from './location-delete-room-dialog.component';

describe('LocationDeleteRoomDialogComponent', () => {
  let component: LocationDeleteRoomDialogComponent;
  let fixture: ComponentFixture<LocationDeleteRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDeleteRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
