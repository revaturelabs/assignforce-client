import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorObservable } from '../../../../node_modules/rxjs/observable/ErrorObservable';
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { from } from './../../../../node_modules/rxjs/observable/from';
import { BatchControllerService } from './../../services/api/batch-controller/batch-controller.service';
import { CurriculumControllerService } from './../../services/api/curriculum-controller/curriculum-controller.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';
import { AppMaterialModule } from '../../material.module';
import { Batch } from '../../model/Batch';
import { Curriculum } from '../../model/Curriculum';
import { ReportsComponent } from './reports.component';

describe("ReportsComponent", () => {
  let batchService: BatchControllerService;
  let curriculumService;
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  //no dummy curriculum data added yet
  // class MockCurriculumControllerService {
  //   findAll(): Observable<Curriculum[]> {
  //     return Observable.of();

  //   }
  //   update(curriculum: Curriculum){
  //     if(curriculum == null){
  //       return Observable.of(new Error('testError'));
  //     }
  //     return curriculum;
  //   }
  // }

  const batches: Batch[] =
    [{
      id: 740,
      name: "Test1",
      startDate: new Date("2018-04-11").getTime(),
      endDate: new Date("2018-06-17").getTime(),
      curriculum: 2,
      trainer: null,
      cotrainer: null,
      skills: [],
      location: 1,
      building: 1,
      room: 7,
      size: 21,
      finalProject: 1,
    },
    {
      id: 741,
      name: "Test2",
      startDate: new Date("2018-05-11").getTime(),
      endDate: new Date("2018-07-17").getTime(),
      curriculum: 1,
      trainer: null,
      cotrainer: null,
      skills: [],
      location: 2,
      building: 1,
      room: 7,
      size: 21,
      finalProject: 1,
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReportsComponent],
      providers: [BatchControllerService,
         {provide: CurriculumControllerService, useClass: CurriculumControllerService},
         SettingControllerService],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  //testing create of reports
  it("should create", () => {
    const curriculumService = TestBed.get(CurriculumControllerService);
    const batchService = TestBed.get(BatchControllerService);
    spyOn(curriculumService, "findAll").and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(batchService, "findAll").and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    // expect(0).toBe(0);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  // testing errors
  it("should test on error", () => {
    const curriculumService = TestBed.get(CurriculumControllerService);
    const batchService = TestBed.get(BatchControllerService);
    spyOn(curriculumService, "findAll").and.callFake(() => {
      return ErrorObservable.create('error message');
    });
    spyOn(batchService, "findAll").and.callFake(() => {
      return ErrorObservable.create("error message");
    });

    component.ngOnInit();
    curriculumService.findAll().subscribe(
      (data) => {},
      (error) => {
        this.message = error;
      },
    );
    expect(this.message).toBe("error message");
  });

  it("should mapBatches", () => {
    component.allBatches = batches;
    expect(component.mapBatches()).toEqual([[], [], [], [batches[0]], [batches[1]], [], [], [], [], [], [], []]);
  });

});
