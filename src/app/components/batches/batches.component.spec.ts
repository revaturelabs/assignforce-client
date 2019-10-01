import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BatchControllerService } from "../../services/api/batch-controller/batch-controller.service";
import { TrainerControllerService } from "../../services/api/trainer-controller/trainer-controller.service";
import { BatchesTimelineFilterComponent } from "../batches-timeline-filter/batches-timeline-filter.component";
import { BatchesTimelineComponent } from "../batches-timeline/batches-timeline.component";

import { UrlService } from "../../services/url/url.service";

import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppMaterialModule } from "../../material.module";
import { AddressControllerService } from "../../services/api/address-controller/address-controller.service";
import { BuildingControllerService } from "../../services/api/building-controller/building-controller.service";
import { CachedObjectsService } from "../../services/api/cache/cached-objects.service";
import { CurriculumControllerService } from "../../services/api/curriculum-controller/curriculum-controller.service";
import { FocusControllerService } from "../../services/api/focus-controller/focus-controller.service";
import { RoomControllerService } from "../../services/api/room-controller/room-controller.service";
import { SettingControllerService } from "../../services/api/setting-controller/setting-controller.service";
import { FillSkillsService } from "../../services/api/skill-controller/fill-skills.service";
import { SkillControllerService } from "../../services/api/skill-controller/skill-controller.service";
import { AuthService } from "../../services/auth/auth.service";
import { BatchesComponent } from "./batches.component";

import { batchService, curriculumService, finalProjectService, skillService, trainerService, settingsService } from "../../../jestGlobalMocks";
import { DateAddPipe } from "../../pipes/date-add.pipe";
import { FinalProjectControllerService } from "../../services/api/final-project-controller/final-project-controller.service";
import { BatchFormComponent } from "../batch-form/batch-form.component";

describe("BatchesComponent", () => {
  let component: BatchesComponent;
  let fixture: ComponentFixture<BatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterModule, // added below
        RouterTestingModule,
        // UrlService
      ],
      declarations: [BatchesComponent,
          BatchesTimelineComponent,
          BatchesTimelineFilterComponent,
          BatchFormComponent,
          DateAddPipe,
        ],
      providers: [
        { provide: BatchControllerService, useValue: batchService },
        { provide: CurriculumControllerService, useValue: curriculumService },
        { provide: FinalProjectControllerService, useValue: finalProjectService },
        { provide: TrainerControllerService, useValue: trainerService },
        { provide: SettingControllerService, useValue: settingsService },
        FocusControllerService,
        AddressControllerService,
        RoomControllerService,
        CachedObjectsService,
        FillSkillsService,
        BuildingControllerService,
        SkillControllerService,
        AuthService, // added below
        RouterModule,
        RouterTestingModule,
        UrlService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call find all on curriculum service", () => {
    expect(curriculumService.findAll).toHaveBeenCalled();
  });
});

/** this component contains a lot of functionality, and mostly the functionality comes from services external to the component
 * However, there is a form group here that is untested.-Sam J
 */