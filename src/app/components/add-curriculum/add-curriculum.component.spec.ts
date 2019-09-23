import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { HttpClientModule, HttpResponse } from "../../../../node_modules/@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "../../../../node_modules/@angular/material";
import { AppMaterialModule } from "../../material.module";
import { Curriculum } from "../../model/Curriculum";
import { Skill } from "../../model/Skill";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { from } from "./../../../../node_modules/rxjs/observable/from";
import { AddCurriculumComponent } from "./add-curriculum.component";

describe("AddCurriculumComponent", () => {
  let curriculumControllerService: MockCurriculumControllerService;
  let dialogRef: MockMatDialogRef;
  let component: AddCurriculumComponent;
  let fixture: ComponentFixture<AddCurriculumComponent>;
  let curriculum_object = new Curriculum(1, "Test Curriculum", true, true, [new Skill(1, "skill1", true)]);

  const testData: Curriculum[] = [
    new Curriculum(1, "Test Curriculum", true, true, [new Skill(1, "skill1", true)]),
    new Curriculum(2, "Test Curriculum 2", true, false, [new Skill(2, "skill2", true)]),
  ];

  const testSkillData: Skill[] = [
    new Skill(1, "skill1", true),
    new Skill(2, "skill2", true),
    new Skill(3, "skill3", false),
  ];

  class MockCurriculumControllerService {
    findAll(): Observable<Curriculum[]> {
      return Observable.of(testData);
    }
    create(curriculum): Observable<boolean> {
      return Observable.of(true);
    }
  };

  class MockMatDialogRef {
    open() {}
    close() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, MatDialogModule, HttpClientModule, FormsModule],
      declarations: [ AddCurriculumComponent ],
      //schemas: [NO_ERRORS_SCHEMA],
      providers: [SkillControllerService,
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA},
        {provide: CurriculumControllerService, useClass: MockCurriculumControllerService},
        {provide: MatDialogRef, useClass: MockMatDialogRef},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCurriculumComponent);
    const skillControllerService = TestBed.get(SkillControllerService);
    component = fixture.componentInstance;
    curriculum_object = new Curriculum(1, "Test Curriculum", true, true, [new Skill(1, "skill1", true)]);
    curriculumControllerService = TestBed.get(CurriculumControllerService);
    dialogRef = TestBed.get(MatDialogRef);

    spyOn(skillControllerService, "findAll").and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close the modal", () => {
    component.curriculum = testData[1];
    component.data = testData[1];

    spyOn(curriculumControllerService, "create")
        .and.callFake(() => {
          return Observable.of(HttpResponse);
        });

    spyOn(component, "closeDialog")
        .and.callThrough();

    component.curriculum = testData[1];
    component.addCurriculum();

    expect(component.closeDialog).toBeTruthy();
  });

  it("should reset the curriculum object so that we do not have undefined issues when loading a page", () => {
    const curriculum: Curriculum = {
      id: 567,
      name: "test",
      skills: [testSkillData[0], testSkillData[1], testSkillData[2]],
      isActive: false,
      isCore: false,
    };
    component.curriculum = curriculum;
    component.newCurriculum();
    expect(component.curriculum).toEqual({id: 0, name: "", skills: [], isActive: true, isCore: true});
  });

  it("should add a new curriculum", () => {
    component.curriculum = testData[1];
    component.data = testData[1];

    spyOn(curriculumControllerService, "create")
      .and.callThrough();

    spyOn(component, "closeDialog")
      .and.callFake(() => {
      });

    component.curriculum = testData[1];
    component.addCurriculum();

    expect(curriculumControllerService.create).toHaveBeenCalled();
  });
});
