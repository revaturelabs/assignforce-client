import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-delete-location-dialog',
  templateUrl: './location-delete-location-dialog.component.html'
})

// Dialog Components which reference the respective html templates in this component

// At some point, we may want a LocationAddBuildingDialogComponent since it just uses
// the LocationAddDialogComponent default, which references the name anyways
// so it's pretty much a LocationAddBuildingDialogComponent already.
export class LocationDeleteLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
