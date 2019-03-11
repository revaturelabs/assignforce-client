import { from } from './../../../../node_modules/rxjs/observable/from';
import { CurriculumControllerService } from './../../services/api/curriculum-controller/curriculum-controller.service';
import { BatchControllerService } from './../../services/api/batch-controller/batch-controller.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorObservable } from '../../../../node_modules/rxjs/observable/ErrorObservable';
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";

import { AppMaterialModule } from '../../material.module';
import { ReportsComponent } from './reports.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';

describe('ReportsComponent', () => {
  let batchService: BatchControllerService;
  let curriculumService: CurriculumControllerService;
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  const batches = 
    {
      id: 740,
      name: '1803 Mar12 .NET',
      startDate: new Date('2018-04-11').getTime(),
      endDate: new Date('2018-06-17').getTime(),
      curriculum: 2,
      trainer: null,
      cotrainer: null,
      skills: [],
      location: 1,
      building: 1,
      room: 7,
      classSize: 21
    }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ReportsComponent],
      providers: [BatchControllerService, CurriculumControllerService, SettingControllerService]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  //testing create of reports
  it('should create', () => {
    let curriculumService = TestBed.get(CurriculumControllerService);
    let batchService = TestBed.get(BatchControllerService);
    spyOn(curriculumService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(batchService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    //expect(0).toBe(0);
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  //testing errors
  it('should test on error', () => {
    let curriculumService = TestBed.get(CurriculumControllerService);
    let batchService = TestBed.get(BatchControllerService);
    spyOn(curriculumService, 'findAll').and.callFake(() => {
      return ErrorObservable.create('error message');
    });
    spyOn(batchService, 'findAll').and.callFake(() => {
      return ErrorObservable.create('error message');
    });

    component.ngOnInit();
    curriculumService.findAll().subscribe(
      data => {},
      error => {
        this.message = error;
      }
    );
    expect(this.message).toBe('error message');
  });


  it('should mapBatches', ()=> {
    component.mapBatches();
    spyOn(component.allBatches, 'find');
    //expect(this.batches.length).not.toBeUndefined();
    expect(this.batches).Any();
  });

});
