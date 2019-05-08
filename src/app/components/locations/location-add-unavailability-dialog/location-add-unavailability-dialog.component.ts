import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-add-unavailability-dialog',
  templateUrl: './location-add-unavailability-dialog.component.html'
})
export class LocationAddUnavailabilityDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LocationAddUnavailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
