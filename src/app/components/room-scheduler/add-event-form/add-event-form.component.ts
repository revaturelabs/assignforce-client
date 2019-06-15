import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { thisExpression } from '@babel/types';
import { Batch } from '../../../model/Batch';
import { Event } from "../../../model/Event";
import { Room } from '../../../model/Room';
import { AddressControllerService } from '../../../services/api/address-controller/address-controller.service';
import { BatchControllerService } from "../../../services/api/batch-controller/batch-controller.service";
import { BuildingControllerService } from '../../../services/api/building-controller/building-controller.service';
import { EventControllerService } from "../../../services/api/event-controller/event-controller.service";
import { RoomControllerService } from '../../../services/api/room-controller/room-controller.service';
import { RoomSchedulerComponent } from '../room-scheduler.component';

@Component({
    selector: 'add-event-form',
    templateUrl: 'add-event-form.component.html',
    styleUrls: ['add-event-form.component.css']
})

export class RoomAddEventFormComponent implements OnInit {
    batchArray: Batch[] = [];    
    roomArray: Room[] = [];
    startDate: Date;
    endDate: Date;

    addEventForm = this.fb.group({
        startDate: ['',Validators.required],
        endDate: ['', Validators.required],
        room: ['', Validators.required],
        batch: ['', Validators.required],
        other: ['']
    })


    selected = "None";
    private newEvent: Event;
    constructor(public dialogRef: MatDialogRef<RoomSchedulerComponent>, private fb: FormBuilder,
                private batchService: BatchControllerService,
                private eventService: EventControllerService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.roomArray = this.data.rooms;
        this.batchService.findAll().subscribe((batchArray) => {
            this.batchArray = batchArray;
        });
        this.batchArray.filter((filter) => {
            filter.location === this.data.location;
        })
    }

    cancel() {
        this.dialogRef.close();
    }

    addEvent() {
        console.log(this.addEventForm.value);
        this.newEvent = new Event(null, this.addEventForm.value.startDate, this.addEventForm.value.endDate,
            this.addEventForm.value.batch,new Date(), this.addEventForm.value.room );
        this.eventService.create(this.newEvent).toPromise();
        this.dialogRef.close();
    }
}