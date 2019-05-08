import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-delete-room-dialog',
  templateUrl: './location-delete-room-dialog.component.html'
})
export class LocationDeleteRoomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDeleteRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
