import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { finalProjectService } from "../../../../jestGlobalMocks";
import { AppMaterialModule } from "../../../material.module";
import { FinalProjectControllerService } from "../../../services/api/final-project-controller/final-project-controller.service";
import { AuthService } from "../../../services/auth/auth.service";
import { UrlService } from "../../../services/url/url.service";
import { ProjectItemComponent } from "./project-item.component";
import { CachedObjectsService } from "../../../services/api/cache/cached-objects.service";
import { FinalProject } from "../../../model/FinalProject";

describe("ProjectItemComponent", () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;
  let finalProject: FinalProject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectItemComponent ],
      imports: [
        AppMaterialModule,
        RouterModule,
        RouterTestingModule,
       ],
      providers: [
        {provide: FinalProjectControllerService, useValue: finalProjectService},
        AuthService,
        UrlService,
        CachedObjectsService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    finalProject = new FinalProject(1, "Assignforce", "The Assignforce", true);
    component.project = finalProject;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
