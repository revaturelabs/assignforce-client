import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSchedulerComponent } from './room-scheduler.component';
import { MatOptionModule, MatTableModule, MatSelectModule, MatDialogRef, MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER } from '@angular/material';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { EventControllerService } from '../../services/api/event-controller/event-controller.service';

describe('RoomSchedulerComponent', () => {
  let component: RoomSchedulerComponent;
  let fixture: ComponentFixture<RoomSchedulerComponent>;
  class diagStub {
    close() {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSchedulerComponent ],
      imports: [MatOptionModule, MatTableModule, MatSelectModule, HttpClientTestingModule],
      providers: [AddressControllerService, BuildingControllerService, RoomControllerService, CachedObjectsService, EventControllerService,
     MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // let http = TestBed.get(HttpTestingController);
    // let addServ = TestBed.get(AddressControllerService);
    fixture = TestBed.createComponent(RoomSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
