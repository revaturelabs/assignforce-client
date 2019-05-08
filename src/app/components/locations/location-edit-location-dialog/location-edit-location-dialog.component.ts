import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-location-edit-location-dialog',
  templateUrl: './location-edit-location-dialog.component.html'
})
export class LocationEditLocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationEditLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
