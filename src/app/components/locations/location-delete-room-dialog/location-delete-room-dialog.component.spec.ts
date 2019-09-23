import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AppMaterialModule } from "../../../material.module";
import { LocationDeleteRoomDialogComponent } from "./location-delete-room-dialog.component";

class MockDialog {
  close() {}
}

describe("LocationDeleteRoomDialogComponent", () => {
  let component: LocationDeleteRoomDialogComponent;
  let fixture: ComponentFixture<LocationDeleteRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      providers: [
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {room: {}}},
        {provide: MatDialogRef, useClass: MockDialog},
      ],
      declarations: [ LocationDeleteRoomDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
