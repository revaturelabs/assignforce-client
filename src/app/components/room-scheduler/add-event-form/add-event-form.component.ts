import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RoomSchedulerComponent } from '../room-scheduler.component';

@Component({
    selector: 'add-event-form',
    templateUrl: 'add-event-form.component.html',
    styleUrls: ['add-event-form.component.css']
})

export class RoomAddEventFormComponent implements OnInit {

    isOther: boolean;

    constructor(public dialogRef: MatDialogRef<RoomSchedulerComponent>,) {

    }
    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    addEvent() {
        // TODO: Add Event
    }
}