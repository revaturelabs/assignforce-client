import { HttpClient } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable } from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { Component, NO_ERRORS_SCHEMA } from "../../../../node_modules/@angular/core";
import { FormBuilder } from "../../../../node_modules/@angular/forms";
import { MatDialog, MatDialogModule, MatDialogRef } from "../../../../node_modules/@angular/material";
import { BrowserAnimationsModule } from "../../../../node_modules/@angular/platform-browser/animations";
import { ErrorObservable } from "../../../../node_modules/rxjs/observable/ErrorObservable";
import {curriculumService, mockCurriculum, mockTrainers, skillService, trainerService} from "../../../jestGlobalMocks";
import { AppMaterialModule } from "../../material.module";
import { Skill } from "../../model/Skill";
import { Trainer } from "../../model/Trainer";
import { Unavailability } from "../../model/Unavailability";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FilehandlerService } from "../../services/api/filehandler-controller/filehandler-controller.service";
import { FocusControllerService } from "../../services/api/focus-controller/focus-controller.service";
import { FillSkillsService } from "../../services/api/skill-controller/fill-skills.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { UrlService } from "../../services/url/url.service";
import { from } from "./../../../../node_modules/rxjs/observable/from";
import { TrainerItemComponent } from "./trainer-item/trainer-item.component";
import { TrainersAddComponent } from "./trainers-add/trainers-add.component";
import { TrainersComponent } from "./trainers.component";

describe("TrainersComponent", () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let mockDialog: MatDialog;
  let fillSkillsService: FillSkillsService;
  let cacheService: CachedObjectsService;
  let filehandlerService: FilehandlerService;
  let trainerItem: TrainerItemComponent;
  const trainer: Trainer = {
    id: 1,
    firstName: "Dummy",
    lastName: "Data",
    isActive: true,
    preferredLocation: null,
    unavailabilities: [],
    email: "",
    skills: [],
    certifications: [],
    resume: "",
    linkedInUrl: "",
  };

  const  mockTrainerService = {
    findAll: jest.fn().mockImplementation(() => {
      console.log("called");
      return of(mockTrainers);
    }),
    create: jest.fn().mockImplementation(() => {
      return of(mockTrainers);
    }),
  };

  class TrainersAddMock {
    open() {
      return {
        afterClosed: () => Observable.of(Trainer),
      };
    }
  }

  let mockClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AppMaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
        { provide: TrainerControllerService, useValue: trainerService },
        { provide: HttpClient, useValue: mockClient },
        { provide: MatDialog, useClass: TrainersAddMock },
        { provide: TrainerItemComponent, useValue: mockTrainers[0] },
        { provide: SkillControllerService, useValue: skillService },
        { provide: CurriculumControllerService, useValue: curriculumService },
        AuthService,
        UrlService,
        FillSkillsService,
        CachedObjectsService,
        FocusControllerService,
        TrainerControllerService,
        FilehandlerService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;

    fillSkillsService = TestBed.get(FillSkillsService);
    mockClient = TestBed.get(HttpClient);
    cacheService = TestBed.get(CachedObjectsService);
    mockDialog = TestBed.get(MatDialog);
    filehandlerService = TestBed.get(FilehandlerService);

    spyOn(fillSkillsService, "setList").and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(cacheService, "getTrainers").and.callFake(() => {
      return from([[1, 2, 3]]);
    });
  });

  it("should create TrainersComponent", () => {
    expect(component).toBeTruthy();
  });

  it("trainer should exist", () => {
    expect(trainer).toBeTruthy();
  });

  it("mockTrainers should be defined", () => {
    expect(mockTrainers).toBeDefined();
  });

  it("mockTrainers at index i should be defined", () => {
    const i = 4;
    expect(mockTrainers[i]).toBeDefined();
  });

  it("mockTrainers at index i should have id of n", () => {
    const i = 2;
    const n = 37;
    expect(mockTrainers[i].id).toBe(n);
  });

  it("mockTrainers at index i should NOT have id of n", () => {
    const i = 2;
    const n = 22;
    expect(mockTrainers[i].id).not.toBe(n);
  });

  it("should test the parts of addTrainer that do not deal with the dialog", () => {
    spyOn(trainerService, "create").and.callThrough();
    trainerService.create(trainer);
    expect(trainerService.create).toHaveBeenCalledWith(trainer);
  });

  it("should test to see if the component opens", () => {
    spyOn(mockDialog, "open").and.callThrough();
    mockDialog.open(TrainersAddMock);
    expect(mockDialog.open).toHaveBeenCalledWith(TrainersAddMock);
  });

  it ("should have a defined component", () => {
    expect(component).toBeDefined();
  });

  it("should call the trainer service findAll", () => {
    trainerService.findAll();
    expect(trainerService.findAll).toHaveBeenCalled();
  });

  it("should call the cache service getCurriculua", () => {
    spyOn(cacheService, "getCurricula").and.callThrough();
    cacheService.getCurricula();
    expect(cacheService.getCurricula).toHaveBeenCalled();
  });

  it("should call the cache service getTrainers", () => {
    cacheService.getTrainers();
    expect(cacheService.getTrainers).toHaveBeenCalled();
  });

});
