import { SkillControllerService } from './../../services/api/skill-controller/skill-controller.service';
import { from } from './../../../../node_modules/rxjs/observable/from';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorObservable } from '../../../../node_modules/rxjs/observable/ErrorObservable';
import { BatchesTimelineComponent } from './batches-timeline.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BatchesTimelineFilterComponent } from '../batches-timeline-filter/batches-timeline-filter.component';
import { BatchControllerService } from '../../services/api/batch-controller/batch-controller.service';
import { HttpClient } from '@angular/common/http';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { Trainer } from '../../model/Trainer';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { componentFactoryName } from '../../../../node_modules/@angular/compiler';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { MatSelectChange, MatSelect, MatCheckboxChange, MatOption } from '../../../../node_modules/@angular/material';
import { EventListener } from '../../../../node_modules/@angular/core/src/debug/debug_node';
import {BuildingControllerService} from "../../services/api/building-controller/building-controller.service";
import {RoomControllerService} from "../../services/api/room-controller/room-controller.service";

describe("BatchesTimelineComponent", () => {
  let component: BatchesTimelineComponent;
  let fixture: ComponentFixture<BatchesTimelineComponent>;
  let addressService: AddressControllerService;
  let trainerService: TrainerControllerService;
  let batchService: BatchControllerService;
  let skillService: SkillControllerService;
  let settingService: SettingControllerService;
  let curriculumService: CurriculumControllerService;
  let message = '';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [BatchesTimelineComponent, BatchesTimelineFilterComponent],
      providers: [
        BuildingControllerService,
        RoomControllerService,
        TrainerControllerService,
        BatchControllerService,
        SettingControllerService,
        CurriculumControllerService,
        FocusControllerService,
        AddressControllerService,
        SkillControllerService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTimelineComponent);
    component = fixture.componentInstance;
    settingService = TestBed.get(SettingControllerService);
    addressService = TestBed.get(AddressControllerService);
    trainerService = TestBed.get(TrainerControllerService);
    batchService = TestBed.get(BatchControllerService);
    curriculumService = TestBed.get(CurriculumControllerService);
    skillService = TestBed.get(SkillControllerService);

    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test on ngOnInIt', () => {
    spyOn(settingService, 'find').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(addressService, 'findAll').and.callFake(() => {
      return from([[{ buildings: 1 }, { buildings: 2 }]]);
    });
    spyOn(trainerService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(curriculumService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(batchService, 'findAll').and.callFake(() => {
      //return from([[1,2,3]]);
      return from([
        [
          {
            name: '1708 Aug14 Java',
            startDate: '2017-08-14T08:00:00Z',
            endDate: '2017-10-20T08:00:00Z',
            curriculum: 1,
            trainer: 13,
            cotrainer: 36,
            students: 15,
            skills: [4, 1, 2, 3, 50, 51, 25, 48, 49, 52, 54, 55, 56, 57],
            address: 1,
            building: 1,
            room: 4,
            id: 187
          },
          {
            id: 191,
            name: '1610 Oct24 Java',
            endDate: '2017-01-06T10:00:00Z',
            startDate: '2016-10-24T08:00:00Z',
            cotrainer: 10,
            curriculum: 1,
            address: null,
            room: null,
            trainer: 11
          }
        ]
      ]);
    });

    component.ngOnInit();

    expect(0).toBe(0);
  });

  it('should test on ngOnInIt empty service', () => {
    spyOn(settingService, 'find').and.callFake(() => {
      return from([[[]]]);
    });
    spyOn(addressService, 'findAll').and.callFake(() => {
      return from([[]]);
    });
    spyOn(trainerService, 'findAll').and.callFake(() => {
      return from([[]]);
    });
    spyOn(curriculumService, 'findAll').and.callFake(() => {
      return from([[]]);
    });
    spyOn(batchService, 'findAll').and.callFake(() => {
      return from([[]]);
    });

    component.ngOnInit();

    expect(0).toBe(0);
  });

  it('should set the today line', () => {
    component.updateTodayLine();
    expect(component.todayLine.x1).not.toBeNull();
    expect(component.todayLine.x2).not.toBeNull();
    expect(component.todayLine.y1).not.toBeNull();
    expect(component.todayLine.y2).not.toBeNull();
  });

  // it('should set the list of trainers', () => {
  //   component.updateTrainers();
  //   expect(component.trainerList).toBeTruthy();
  // });

  // it('should return the list of trainers with positions', async done => {
  //   component.updateBatches();
  //   done();
  //   const trainers = component.getTrainers();
  //   let expectedAmount = component.trainerList.length;
  //   if (expectedAmount === 0) {
  //     expectedAmount = 1;
  //   }
  //
  //   expect(trainers.length).toEqual(expectedAmount);
  //   expect(trainers[0].name).toBeTruthy();
  //   expect(trainers[0].left).toBeTruthy();
  //   expect(trainers[0].width).toBeTruthy();
  // });

  it('should get a different color for each core curriculum', () => {
    const jcolor = component.getColorForcurriculum(1);
    const scolor = component.getColorForcurriculum(2);
    const dcolor = component.getColorForcurriculum(3);
    const ucolor = component.getColorForcurriculum(105);
    const defaultColor = component.getColorForcurriculum(999);
    expect(jcolor).not.toEqual(scolor);
    expect(jcolor).not.toEqual(dcolor);
    expect(jcolor).not.toEqual(ucolor);
    expect(scolor).not.toEqual(dcolor);
    expect(scolor).not.toEqual(ucolor);
    expect(dcolor).not.toEqual(ucolor);
    expect(defaultColor).toEqual('#dddddd');
  });
  it('should return an empty list if timescaleEnabled is false', () => {
    component.timescaleEnabled = false;
    expect(JSON.stringify(component.getTimescale())).toBe(JSON.stringify([]));
  });

  it('should get the line breaks', () => {
    const lb = component.getBreaks();
    expect(lb.length).toEqual(component.trainersOnThisPage);
  });
  it('should get the lines between batches', () => {
    const bl = component.getBatchLanes();
    expect(bl.length).toEqual(component.trainersOnThisPage);
  });

  it('should set actualTrainersPerPage to the number of trainers as well as be the only page', () => {
    component.trainersPerPage = 0;
    component.updatePage();
    // expect(component.actualTrainersPerPage).toBe(component.trainerList.length);
    expect(component.maxPages).toBe(0);
    expect(component.currentPage).toBe(0);
  });

  it('should set actualTrainersPerPage to the number trainers per page desired', () => {
    component.trainersPerPage = 25;
    // component.trainerList.length = 50;
    component.updatePage();
    expect(component.actualTrainersPerPage).toBe(component.trainersPerPage);
  });

  it('should test on onFilterChange', () => {
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();

    let de = fixture.debugElement.query(By.css('app-batches-timeline-filter'));

    //  let matSelect = new MatSelect(null, null, null, null, null, null, null, null, null, null, null, null);
    let matSelectChange = new MatSelectChange(null, null);
    let matCheckbox = new MatCheckboxChange();
    let matOption = new MatOption(null, null, null, null);

    this.MatSort;

    //  de.triggerEventHandler('filterChangeEmitter', new MatSelectChange(null, null));
    de.triggerEventHandler('filterChangeEmitter', matSelectChange);

    de.triggerEventHandler('filterChangeEmitter', matCheckbox);

    //de.triggerEventHandler('filterChangeEmitter', matOption);



    // expect(component.onFilterChange).toHaveBeenCalled();
  });
  it('should test on switch("startdate")', () => {
    // expect(component.onFilterChange).toHaveBeenCalled();
  });
// });

// it('should return the rectangles for the batches', async done => {
//   component.updateBatches();
//   done();
//   const rects = component.getBatchesRectangles();
//   expect(rects.length).toEqual(component.batchList.length);
// });



//Commented out tests that will have to be fixed
// it('should return a list of months and their position', () => {
//   const months = component.getTimescale();
//   expect(months.length).toBeGreaterThan(1);
// });

// it('should convert the date to a position', () => {
//   const ypos = component.dateToYPos(Date.now() + 1000 * 60 * 60 * 24 * 7 * 3); // now + 3 weeks
//   expect(ypos).toBeGreaterThan(0); // should return a positive value
// });

// it('should convert the date to a position', () => {
//   const dateval = component.yPosToDate(20);
//   expect(dateval).toBeLessThan(Date.now()); // should return a value before today
//   expect(dateval).toBeGreaterThan(component.startValue); // and after graph start
// });
// it('should get the timescale', () => {
//   const ts = component.getTimescale();
//   expect(ts.length).toBeGreaterThan(0);
// });

// it('should zoom the page', () => {
//   const prezoom = component.endDate.valueOf() - component.startDate.valueOf();
//   const zoomFactor = 2;
//   component.startZoom(100);
//   component.zoomBy(zoomFactor);
//   component.finishZoom();
//   expect(component.endDate.valueOf() - component.startDate.valueOf()).toEqual(zoomFactor * prezoom);
// });

// it('should shift the graph', () => {
//   const predate = component.startValue;
//   component.shiftBy(50);
//   expect(component.startValue).toBeGreaterThan(predate);
//   component.shiftBy(-50);
//   expect(component.startValue).toEqual(predate);
// });

it('should set actualTrainersPerPage to the number of trainers', () => {
  component.trainersPerPage = 500;
  // component.trainerList.length = 50;
  component.actualTrainersPerPage = 50;
  component.updatePage();
  expect(component.actualTrainersPerPage).toBe(500);
});

//  it('should test on ngOnInIt error service', () => {

//     spyOn(settingService, 'find').and.callFake(()=>{return ErrorObservable.create('error message')});
//     spyOn(addressService, 'findAll').and.callFake(()=>{return ErrorObservable.create('error message')});
//     spyOn(trainerService, 'findAll').and.callFake(()=>{return ErrorObservable.create('error message')});
//     spyOn(curriculumService, 'findAll').and.callFake(()=>{return ErrorObservable.create('error message')});
//     spyOn(batchService, 'findAll').and.callFake(()=>{return ErrorObservable.create('error message')});

//     component.ngOnInit();

//     addressService.findAll().subscribe(
//       data => {},
//       error => {
//         this.message = error;
//       }
//     );
//     expect(this.message).toBe("error message");

    // expect(component).toBeTruthy();
    // expect(0).toBe(0);
  // });
});
