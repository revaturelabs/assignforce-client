import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Unavailability } from '../../../model/Unavailability';

@Component({
  selector: 'app-location-edit-room-dialog',
  templateUrl: './location-edit-room-dialog.component.html'
})
export class LocationEditRoomDialogComponent {
  startDate = new Date();
  endDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<LocationEditRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.data.room.unavailabilities === undefined) {
      const check: Unavailability[] = [];
      this.data.room.unavailabilities = check;
    }
  }
}
