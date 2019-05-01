import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-change-unavailability-dialog',
  templateUrl: './location-change-unavailability-dialog.component.html'
})
export class LocationChangeUnavailabilityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationChangeUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
