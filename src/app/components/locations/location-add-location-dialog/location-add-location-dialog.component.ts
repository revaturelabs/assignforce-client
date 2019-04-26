import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-location-add-location-dialog',
  templateUrl: './location-add-location-dialog.component.html'
})
export class LocationAddLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationAddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}