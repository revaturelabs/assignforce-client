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
    batch1: Batch = new Batch(null,'1901Tony-Node-JS',1012019,4,1,1,null,null,1,100,10);
    batch2: Batch = new Batch(null,'1901Bill-NET', 1232019,3312019,null,2,null,null,1,1,104,23);
    batchArray = [this.batch1, this.batch2];
    room1: Room = new Room(1, true, '3201B', 2);
    room2: Room = new Room(2, true, '2201C', 2);
    
    roomArray = [this.room1, this.room2];

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
    })
}