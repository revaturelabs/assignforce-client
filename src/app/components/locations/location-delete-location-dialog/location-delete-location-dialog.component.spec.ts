import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppMaterialModule } from "../../../material.module";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LocationDeleteLocationDialogComponent } from "./location-delete-location-dialog.component";

class MockDialog {
  close(){}
}
describe("LocationDeleteLocationDialogComponent", () => {
  let component: LocationDeleteLocationDialogComponent;
  let fixture: ComponentFixture<LocationDeleteLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppMaterialModule ],
      providers: [
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA},
        {provide: MatDialogRef, useClass: MockDialog},
      ],
      declarations: [ LocationDeleteLocationDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDeleteLocationDialogComponent);
    component = fixture.componentInstance;
    component.data = {
      location: {},
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
