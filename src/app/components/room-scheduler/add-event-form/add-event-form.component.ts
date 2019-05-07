import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RoomSchedulerComponent } from '../room-scheduler.component';
import { Batch } from '../../../model/Batch';
import { Room } from '../../../model/Room';
import { FormBuilder, Validators } from '@angular/forms';
import { thisExpression } from '@babel/types';

@Component({
    selector: 'add-event-form',
    templateUrl: 'add-event-form.component.html',
    styleUrls: ['add-event-form.component.css']
})

export class RoomAddEventFormComponent implements OnInit {

    selected = "None";
    constructor(public dialogRef: MatDialogRef<RoomSchedulerComponent>, private fb: FormBuilder) {
    }
    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    addEvent() {
        console.log(this.addEventForm.value);
    }

    addEventForm = this.fb.group({
        startDate: ['',Validators.required],
        endDate: ['', Validators.required],
        room: ['', Validators.required],
        batch: ['', Validators.required],
        other: ['']
    });
    
    
}