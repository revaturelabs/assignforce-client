import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import {$} from "protractor";
import { Address } from "../../model/Address";
import { Building } from "../../model/Building";
import { Curriculum } from "../../model/Curriculum";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FocusControllerService } from "../../services/api/focus-controller/focus-controller.service";
import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";

@Component({
  selector: "app-batches-timeline-filter",
  templateUrl: "./batches-timeline-filter.component.html",
  styleUrls: ["./batches-timeline-filter.component.css"],
})
export class BatchesTimelineFilterComponent implements OnInit {
  constructor(
    private curriculumControllerService: CurriculumControllerService,
    private focusControllerService: FocusControllerService,
    private addressControllerService: AddressControllerService,
    private settingControllerService: SettingControllerService,
    private buildingController: BuildingControllerService,
    private roomController: RoomControllerService,
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
  @Input() trainersPerPage = 0;
  @Input() currentPage = 0;
  @Input() maxPages  = 0;
  @Input() curriculumFilterList: Curriculum [];
  @Input() locationFilterList: Address [];
  @Input() buildingFilterList: Building [];

  @Output() public filterChangeEmitter = new EventEmitter<Event>();

  // This isn't used. Just testing to see if I could get the element from batches-timeline component.
  // Hint: I could. All the extra code.
  @ViewChild("location") location;

  public curriculumData = [];
  public focusData = [];
  public locationData = [];
  public buildingData = [];
  // Dropdown placeholders.
  public locationAny: Address = new Address(0, "Any", null, null, [], true);
  public buildingAny: Building = new Building(true, 0, "Any", [], 0);
  public curriculumAny: Curriculum = new Curriculum(0, "Any", true, true, []);

  ngOnInit() {
    this.loadSettingData();
    this.loadFocusData();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadCurriculumData();
    this.loadLocationData();
  }

  loadSettingData() {
    this.loading = true;
    this.settingControllerService.find().subscribe(
      (result) => {
        const setting = result;
        const value = setting.trainersPerPage;
        if (value != null) {
          this.trainersPerPage = value;
        }
        this.loading = false;
      },
      (err) => {
        console.log("failed to load settings ", err);
      },
    );
  }

  loadCurriculumData() {
    this.curriculumData = [];
    this.curriculumData.push(this.curriculumAny);
    for (const curriculum of this.curriculumFilterList) {
      this.curriculumData.push(curriculum);
    }
    this.curriculumFilter = this.curriculumData[0];
  }

  loadFocusData() {
    this.loading = true;
    this.focusControllerService.findAll().subscribe(
      (result) => {
        this.focusData = [];
        this.focusData.push("Any");
        for (let i = 0; i < result.length; i++) {
          const focus = result[i];
          const value = focus.name;
          if (value != null) {
            this.focusData.push(value);
          }
        }
        this.focusFilter = "Any";
        this.loading = false;
      },
      (err) => {
        console.log("failed to load focuses ", err);
      },
    );
  }

  loadLocationData() {
    this.locationData = Object.values(this.locationFilterList);
    this.locationData.sort((a, b) => a.id - b.id);
    this.locationData.unshift(this.locationAny);
    this.buildingData = this.buildingFilterList;
    this.buildingData.sort((a, b) => a.id - b.id);
    let found = false;
    for (let i = 0; i < this.buildingData.length; i++)
    {
      if (this.buildingData[i].name == "Any") {
        found = true;

        break;
    }
  }
    if (!found) {
      this.buildingData.unshift(this.buildingAny);
      console.log("Oppai");
    }

    this.locationFilter = this.locationData[0];
    this.buildingFilter = this.buildingData[0];
  }

// The basic biiiatch event emitter
onFilterChange(evt: Event) {
  this.filterChangeEmitter.emit(evt);
}

// Special event emitter for location dropdown to populate buildings
//
onLocationSelectChange(evt: Event) {
  this.buildingData = [];

  if (!this.buildingData.includes("Any")) {
    this.buildingData.push(this.buildingAny);
  }
  this.buildingFilter = this.buildingData[0];
  this.filterChangeEmitter.emit(evt);
 }
}
