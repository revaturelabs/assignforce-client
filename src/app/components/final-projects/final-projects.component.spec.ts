import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FinalProjectsComponent } from "./final-projects.component";

import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppMaterialModule } from "../../material.module";

import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { ProjectItemComponent } from "../final-projects/project-item/project-item.component";

import { batchService, finalProjectService, sprintService } from "../../../jestGlobalMocks";
import { BatchControllerService } from "../../services/api/batch-controller/batch-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { UrlService } from "../../services/url/url.service";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { SprintControllerService } from "../../services/api/sprint-controller/sprint-controller.service";

describe("FinalProjectsComponent", () => {
  let component: FinalProjectsComponent;
  let fixture: ComponentFixture<FinalProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [
        FinalProjectsComponent,
        ProjectItemComponent,
      ],
      providers: [
        { provide: FinalProjectControllerService, useValue: finalProjectService },
        { provide: BatchControllerService, useValue: batchService },
        { provide: SprintControllerService, useValue: sprintService },
        AuthService,
        UrlService,
        CachedObjectsService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
