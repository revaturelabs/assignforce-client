import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-add-room-dialog',
  templateUrl: './location-add-room-dialog.component.html'
 })
 export class LocationAddRoomDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationAddRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
 
  onNoClick(): void {
    this.dialogRef.close();
  }
 }