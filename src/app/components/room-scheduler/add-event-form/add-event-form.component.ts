import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoomSchedulerComponent } from '../room-scheduler.component';
import { Batch } from '../../../model/Batch';
import { Room } from '../../../model/Room';
import { FormBuilder, Validators } from '@angular/forms';
import { thisExpression } from '@babel/types';
import { AddressControllerService } from '../../../services/api/address-controller/address-controller.service';
import { BuildingControllerService } from '../../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../../services/api/room-controller/room-controller.service';
import { BatchControllerService } from '../../../services/api/batch-controller/batch-controller.service';
import { EventControllerService } from '../../../services/api/event-controller/event-controller.service';

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


    selected = "None";
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
    }

    addEventForm = this.fb.group({
        startDate: ['',Validators.required],
        endDate: ['', Validators.required],
        room: ['', Validators.required],
        batch: ['', Validators.required],
        other: ['']
    })
}