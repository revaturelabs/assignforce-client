import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { from } from './../../../../node_modules/rxjs/observable/from';
import { Unavailability } from '../../model/Unavailability';
import { AppMaterialModule } from '../../material.module';
import { TrainerItemComponent } from './trainer-item/trainer-item.component';
import { TrainersComponent } from './trainers.component';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { Trainer } from '../../model/Trainer';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '../../../../node_modules/@angular/material';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { AuthService } from '../../services/auth/auth.service';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { UrlService } from '../../services/url/url.service';
import { Skill } from '../../model/Skill';
import { ErrorObservable } from '../../../../node_modules/rxjs/observable/ErrorObservable';
import { FillSkillsService } from '../../services/api/skill-controller/fill-skills.service';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { FocusControllerService } from '../../services/api/focus-controller/focus-controller.service';
import { BrowserAnimationsModule } from '../../../../node_modules/@angular/platform-browser/animations';
import { TrainersAddComponent } from './trainers-add/trainers-add.component';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '../../../../node_modules/@angular/core';
import { FilehandlerService } from '../../services/api/filehandler-controller/filehandler-controller.service';
import {of} from "rxjs/observable/of";
import {mockCurriculum, mockTrainers, trainerService} from "../../../jestGlobalMocks";

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let mockDialog: MatDialog;
  let curriculumService: CurriculumControllerService;
  let router: Router;
  let auth0: AuthService;
  let fillSkillsService: FillSkillsService;
  let cacheService: CachedObjectsService;
  let filehandlerService: FilehandlerService;
  let trainerItem: TrainerItemComponent;
  let trainer: Trainer = {
    id: 1,
    firstName: 'Dummy',
    lastName: 'Data',
    isActive: true,
    preferredLocation: null,
    unavailabilities: [],
    email: '',
    skills: [],
    certifications: [],
    resume: '',
    linkedInUrl: ''
  };

  const  mockTrainerService = {
    findAll: jest.fn().mockImplementation(() => {
      return of(mockTrainers);
    }),
    create: jest.fn().mockImplementation(() => {
      return of(mockTrainers);
    })
  }

  class TrainersAddMock {
    open() {
      return {
        afterClosed: () => Observable.of(Trainer)
      };
    }
  }

  let mockClient : HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppMaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        { provide: TrainerControllerService, useValue: mockTrainerService },
        { provide: HttpClient, useValue: mockClient },
        { provide: MatDialog, useClass: TrainersAddMock },
        { provide: TrainerItemComponent, useValue: mockTrainers[0] },
        CurriculumControllerService,
        AuthService,
        UrlService,
        FillSkillsService,
        CachedObjectsService,
        SkillControllerService,
        FocusControllerService,
        TrainerControllerService,
        FilehandlerService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fillSkillsService = TestBed.get(FillSkillsService);
    curriculumService = TestBed.get(CurriculumControllerService);
    mockClient = TestBed.get(HttpClient);
    cacheService = TestBed.get(CachedObjectsService);
    mockDialog = TestBed.get(MatDialog);
    filehandlerService = TestBed.get(FilehandlerService);

    spyOn(fillSkillsService, 'setList').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(curriculumService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(cacheService, 'getTrainers').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
  });

  it('should create TrainersComponent', () => {
    component = new TrainersComponent(
      mockDialog,
      trainerService,
      curriculumService,
      router,
      auth0,
      fillSkillsService,
      cacheService,
      filehandlerService
    );
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('trainer should exist', () => {
    expect(trainer).toBeTruthy();
  });

  it('mockTrainers should be defined', () => {
    expect(mockTrainers).toBeDefined();
  });

  it('mockTrainers at index i should be defined', () => {
    let i = 4;
    expect(mockTrainers[i]).toBeDefined();
  });

  it('mockTrainers at index i should have id of n', () => {
    let i = 2;
    let n = 37;
    expect(mockTrainers[i].id).toBe(n);
  });

  it('mockTrainers at index i should NOT have id of n', () => {
    let i = 2;
    let n = 22;
    expect(mockTrainers[i].id).not.toBe(n);
  });

  // mockTrainers[1].id is falsy because its properties are defined with "" around each
  test('mockTrainers at index 1 should not have id', () => {
    expect(mockTrainers[1].id).toBeFalsy;
  });

  it('should test the parts of addTrainer that do not deal with the dialog', () => {
    spyOn(trainerService, 'create').and.callThrough();
    trainerService.create(trainer);
    expect(trainerService.create).toHaveBeenCalledWith(trainer);
  }); 

  it('should test to see if the component opens', () => {
    spyOn(mockDialog, 'open').and.callThrough();
    mockDialog.open(TrainersAddMock);
    expect(mockDialog.open).toHaveBeenCalledWith(TrainersAddMock);
  });

  it ('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should call the trainer service findAll', () => {
    expect(trainerService.findAll).toHaveBeenCalled();
  });

  it('should call the cache service getCurriculua', () => {
    spyOn(cacheService, 'getCurricula').and.callThrough();
    cacheService.getCurricula();
    expect(cacheService.getCurricula).toHaveBeenCalled();
  });

  it('should call the cache service getTrainers', () => {
    cacheService.getTrainers();
    expect(cacheService.getTrainers).toHaveBeenCalled();
  });

});
