import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-edit-building-dialog',
  templateUrl: './location-edit-building-dialog.component.html'
})
export class LocationEditBuildingDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationEditBuildingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}