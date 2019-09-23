import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { from } from "./../../../../node_modules/rxjs/observable/from";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "../../material.module";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import {BuildingControllerService} from "../../services/api/building-controller/building-controller.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FocusControllerService } from "../../services/api/focus-controller/focus-controller.service";
import {RoomControllerService} from "../../services/api/room-controller/room-controller.service";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { BatchesTimelineFilterComponent } from "./batches-timeline-filter.component";

import { mockCurriculum, mockLocations, mockBuildings } from "../../../jestGlobalMocks";

describe("BatchesTimelineFilterComponent", () => {
  let component: BatchesTimelineFilterComponent;
  let fixture: ComponentFixture<BatchesTimelineFilterComponent>;
  let curriculumService: CurriculumControllerService;
  let focusService: FocusControllerService;
  let addressService: AddressControllerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [BatchesTimelineFilterComponent],
      providers: [CurriculumControllerService, FocusControllerService, AddressControllerService,
        SettingControllerService, BuildingControllerService, RoomControllerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTimelineFilterComponent);
    component = fixture.componentInstance;
    component.locationFilterList = mockLocations;
    component.curriculumFilterList = mockCurriculum;
    component.buildingFilterList = mockBuildings;
    fixture.detectChanges();
    curriculumService = TestBed.get(CurriculumControllerService);
    focusService = TestBed.get(FocusControllerService);
    addressService = TestBed.get(AddressControllerService);

  });

  it("should create", () => {
      expect(component).toBeTruthy();
    });

  it("should loadCurriculumData", () => {
      component.loadCurriculumData();
      expect(component.curriculumData).toBeTruthy();
    });

  it("should loadFocusData", () => {
      component.loadFocusData();
      expect(component.focusData).toBeTruthy();
    });

  it("should loadLocationData", () => {
      component.loadLocationData();
      expect(component.locationData).toBeTruthy();
    });
});
