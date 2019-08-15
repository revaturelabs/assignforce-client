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

import { mockCurriculum } from "../../../jestGlobalMocks";
import { of } from "rxjs/observable/of";

class MockMatDialogRef {
  open() {}
  close() {}
}

describe("AddCurriculumComponent", () => {
  const testCurrName = "Test Curriculum";
  let dialogRef: MockMatDialogRef;
  let curriculumService: CurriculumControllerService;
  let component: AddCurriculumComponent;
  let fixture: ComponentFixture<AddCurriculumComponent>;
  let curriculum_object = new Curriculum(1, testCurrName, true, true, [new Skill(1, "skill1", true)]);

  const testSkillData: Skill[] = [
    new Skill(1, "skill1", true),
    new Skill(2, "skill2", true),
    new Skill(3, "skill3", false),
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, BrowserAnimationsModule, MatDialogModule, HttpClientModule, FormsModule],
      declarations: [ AddCurriculumComponent ],
      providers: [
        SkillControllerService,
        CurriculumControllerService,
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA},
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
    curriculumService = TestBed.get(CurriculumControllerService);
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
    component.curriculum = mockCurriculum[1];
    component.data = mockCurriculum[1];

    spyOn(curriculumService, "create")
        .and.callFake(() => {
          return Observable.of(HttpResponse);
        });

    spyOn(component, "closeDialog")
        .and.callThrough();

    component.curriculum = mockCurriculum[1];
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
    component.curriculum = mockCurriculum[1];
    component.data = mockCurriculum[1];

    spyOn(curriculumService, "create")
      .and.callFake(() => {
        return of(HttpResponse);
      });

    spyOn(component, "closeDialog")
      .and.callFake(() => {
      });

    component.curriculum = mockCurriculum[1];
    component.addCurriculum();

    expect(curriculumService.create).toHaveBeenCalled();
  });
});
