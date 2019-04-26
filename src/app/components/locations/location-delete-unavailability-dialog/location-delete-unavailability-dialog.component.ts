import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-delete-unavailability-dialog',
  templateUrl: './location-delete-unavailability-dialog.component.html'
})
export class LocationDeleteUnavailabilityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
