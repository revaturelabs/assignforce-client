import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { Address } from "../../model/Address";
import { Building } from "../../model/Building";
import { Curriculum } from "../../model/Curriculum";
import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { RoomControllerService } from '../../services/api/room-controller/room-controller.service';
import {$} from "protractor";

@Component({
  selector: 'app-batches-timeline-filter',
  templateUrl: './batches-timeline-filter.component.html',
  styleUrls: ['./batches-timeline-filter.component.css']
})
export class BatchesTimelineFilterComponent implements OnInit {
  constructor(
    private curriculumControllerService: CurriculumControllerService,
    private focusControllerService: FocusControllerService,
    private addressControllerService: AddressControllerService,
    private settingControllerService: SettingControllerService,
    private buildingController: BuildingControllerService,
    private roomController: RoomControllerService
  ) {}

  @Input() loading = false;

  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() curriculumFilter;
  @Input() focusFilter = "Any";
  @Input() locationFilter;
  @Input() buildingFilter;
  @Input() hideConcludedBatches: boolean;
  @Input() hideBatchlessTrainers: boolean;
  @Input() hideInactiveTrainers: boolean;
  @Input() trainersPerPage: number = 0;
  @Input() currentPage: number = 0;
  @Input() maxPages: number  = 0;

  @Output() public filterChangeEmitter = new EventEmitter<Event>();

  //This isn't used. Just testing to see if I could get the element from batches-timeline component.
  //Hint: I could. All the extra code.
  @ViewChild('location') location;


  public curriculumData = [];
  public focusData = [];
  public locationData = [];
  public buildingData = [];
  //Dropdown placeholders.
  public locationAny: Address = new Address(0, "Any", null, null, [], true);
  public buildingAny: Building = new Building(true, 0, "Any", [], 0);
  public curriculumAny: Curriculum = new Curriculum(0, "Any", true, true, []);

  ngOnInit() {
    this.loadSettingData();
    this.loadCurriculumData();
    this.loadFocusData();
    this.loadLocationData();
    this.loadBuildingData();
  }

  loadSettingData() {
    this.loading = true;
    this.settingControllerService.find().subscribe(
      result => {
        const setting = result;
        const value = setting.trainersPerPage;
        if (value != null) {
          this.trainersPerPage = value;
        }
        this.loading = false;
      },
      err => {
        console.log('failed to load settings ', err);
      }
    );
  }

  loadCurriculumData() {
    this.loading = true;
    this.curriculumControllerService.findAll().subscribe(
      result => {
        this.curriculumData = [];
        this.curriculumData.push(this.curriculumAny);
        for (const curriculum of result) {
          this.curriculumData.push(curriculum);
        }
        this.curriculumFilter = this.curriculumData[0];
        this.loading = false;
      },
      err => {
        console.log("failed to load curriculums ", err);
      }
    );
  }

  loadFocusData() {
    this.loading = true;
    this.focusControllerService.findAll().subscribe(
      result => {
        this.focusData = [];
        this.focusData.push('Any');
        for (let i = 0; i < result.length; i++) {
          const focus = result[i];
          const value = focus.name;
          if (value != null) {
            this.focusData.push(value);
          }
        }
        this.focusFilter = 'Any';
        this.loading = false;
      },
      err => {
        console.log('failed to load focuses ', err);
      }
    );
  }

  loadLocationData() {
    this.loading = true;

    this.addressControllerService.findAll().subscribe(aList => {
      this.locationData = Object.values(aList)
      this.locationData.sort((a, b) => a.id - b.id);
      this.locationData.unshift(this.locationAny)
      this.buildingController.findAll().subscribe(buildings => {
        this.buildingData = buildings;
        this.buildingData.sort((a, b) => a.id - b.id);
        this.buildingData.unshift(this.buildingAny);
          this.locationFilter = this.locationData[0];
          this.buildingFilter = this.buildingData[0];
          this.loading = false;
      });
    });
    
  }

//The basic biiiatch event emitter
onFilterChange(evt: Event) {
  this.filterChangeEmitter.emit(evt);
}

//Special event emitter for location dropdown to populate buildings
onLocationSelectChange(evt: Event) {
  this.buildingData = [];
  this.buildingData.push(this.buildingAny);
  this.buildingFilter = this.buildingData[0];
  for (const building of this.locationFilter.buildings) {
    this.buildingData.push(building);
  }
  this.filterChangeEmitter.emit(evt);
}

loadBuildingData(){
  this.buildingFilter;
}
}
