import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { Router, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { finalProjectService, skillService, sprintService } from "../../../jestGlobalMocks";
import { AppMaterialModule } from "../../material.module";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { SprintControllerService } from "../../services/api/sprint-controller/sprint-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { UrlService } from "../../services/url/url.service";
import { AddSprintComponent } from "./add-sprint.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AddSprintComponent", () => {
  let component: AddSprintComponent;
  let fixture: ComponentFixture<AddSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ],
      declarations: [ AddSprintComponent ],
      providers: [
        { provide: SprintControllerService, useValue: sprintService },
        { provide: FinalProjectControllerService, useValue: finalProjectService },
        { provide: SkillControllerService, useValue: skillService },
        AuthService,
        UrlService,
        RouterModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

/**
 * this component and test are unfinished - the createSprint method is unimplemented and untested. - Sam J
 */