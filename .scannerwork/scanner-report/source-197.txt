import { from } from './../../../../node_modules/rxjs/observable/from';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesTimelineFilterComponent } from './batches-timeline-filter.component';
import { AppMaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import {BuildingControllerService} from "../../services/api/building-controller/building-controller.service";
import {RoomControllerService} from "../../services/api/room-controller/room-controller.service";

describe('BatchesTimelineFilterComponent', () => {
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
        SettingControllerService, BuildingControllerService, RoomControllerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTimelineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    curriculumService = TestBed.get(CurriculumControllerService);
    focusService = TestBed.get(FocusControllerService);
    addressService = TestBed.get(AddressControllerService);

  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should loadCurriculumData', () => {
      let currciulumSpy = spyOn(curriculumService, 'findAll').and.callFake(() => {
        return from([[1, 2, 3]]);
      });
      component.loadCurriculumData();
      expect(component.curriculumData).toBeTruthy();
    });

    it('should loadFocusData', () => {
      let focusSpy = spyOn(focusService, 'findAll').and.callFake(() => {
        return from([[1, 2, 3]]);
      });
      component.loadFocusData();
      expect(component.focusData).toBeTruthy();
    });

    it('should loadLocationData', () => {
      let locationSpy = spyOn(addressService, 'findAll').and.callFake(() => {
        return from([1, 2, 3]);
      });
      component.loadLocationData();
      expect(component.locationData).toBeTruthy();
    });
});
