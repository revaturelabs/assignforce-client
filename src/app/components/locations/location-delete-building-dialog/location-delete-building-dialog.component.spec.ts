import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppMaterialModule } from "../../../material.module";

import { LocationDeleteBuildingDialogComponent } from "./location-delete-building-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

class MockDialog {
  close() {}
}

describe("LocationDeleteBuildingDialogComponent", () => {
  let component: LocationDeleteBuildingDialogComponent;
  let fixture: ComponentFixture<LocationDeleteBuildingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
      declarations: [ LocationDeleteBuildingDialogComponent ],
      providers: [
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA},
        {provide: MatDialogRef, useClass: MockDialog},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteBuildingDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      building: {},
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
