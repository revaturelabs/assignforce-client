import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { AuthenticatingComponent } from './components/authenticating/authenticating.component';
import { BatchesComponent } from './components/batches/batches.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { CoreComponent } from './components/core/core.component';
import { CurriculaComponent } from './components/curricula/curricula.component';
import { CurriculumSkillsComponent } from './components/curriculum-skills/curriculum-skills.component';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component';
import { LocationAddDialogComponent } from './components/locations/add-dialog/location-add-dialog.component';
import { LocationAddLocationDialogComponent } from './components/locations/location-add-location-dialog/location-add-location-dialog.component';
import { LocationAddRoomDialogComponent } from './components/locations/location-add-room-dialog/location-add-room-dialog.component';
import { LocationDeleteBuildingDialogComponent } from './components/locations/location-delete-building-dialog/location-delete-building-dialog.component';
import { LocationDeleteLocationDialogComponent } from './components/locations/location-delete-location-dialog/location-delete-location-dialog.component';
import { LocationDeleteRoomDialogComponent } from './components/locations/location-delete-room-dialog/location-delete-room-dialog.component';
import { LocationEditBuildingDialogComponent } from './components/locations/location-edit-building-dialog/location-edit-building-dialog.component';
import { LocationEditLocationDialogComponent } from './components/locations/location-edit-location-dialog/location-edit-location-dialog.component';
import { LocationEditRoomDialogComponent } from './components/locations/location-edit-room-dialog/location-edit-room-dialog.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationOpenUnavailibilityDialogComponent } from './components/locations/location-open-unavailibility/location-open-unavailibility.component';
import { LocationAddUnavailabilityDialogComponent } from './components/locations/location-add-unavailability-dialog/location-add-unavailability-dialog.component';
import { LocationChangeUnavailabilityDialogComponent } from './components/locations/location-change-unavailability-dialog/location-change-unavailability-dialog.component';
import { LocationDeleteUnavailabilityDialogComponent } from './components/locations/location-delete-unavailability-dialog/location-delete-unavailability-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TrainerItemComponent } from './components/trainers/trainer-item/trainer-item.component';
import { TrainersAddComponent } from './components/trainers/trainers-add/trainers-add.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { SpringXsrfInterceptor } from './interceptors/springXsrfInterceptor';
import { AppMaterialModule } from './material.module';
import { AddressControllerService } from './services/api/address-controller/address-controller.service';
import { BatchControllerService } from './services/api/batch-controller/batch-controller.service';
import { CurriculumControllerService } from './services/api/curriculum-controller/curriculum-controller.service';
import { SettingControllerService } from './services/api/setting-controller/setting-controller.service';
import { SkillControllerService } from './services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from './services/api/trainer-controller/trainer-controller.service';
import { UnavailableControllerService } from './services/api/unavailable-controller/unavailable-controller.service';
import { AuthService } from './services/auth/auth.service';
import { GuardService } from './services/auth/guard.service';
import { SecurityContext } from './services/auth/security-context.service';
import { S3CredentialService } from './services/s3-credential/s3-credential.service';
import { UrlService } from './services/url/url.service';
import { BatchesTimelineComponent } from './components/batches-timeline/batches-timeline.component';
import { BatchesTimelineFilterComponent } from './components/batches-timeline-filter/batches-timeline-filter.component';
import { FocusControllerService } from './services/api/focus-controller/focus-controller.service';
import { EditCurriculumComponent } from './components/edit-curriculum/edit-curriculum.component';
import { FillSkillsService } from './services/api/skill-controller/fill-skills.service';
import { AddTrainerErrorComponent } from './components/trainers/add-trainer-error/add-trainer-error.component';
import { CachedObjectsService } from './services/api/cache/cached-objects.service';
import { AddCurriculumComponent } from './components/add-curriculum/add-curriculum.component';
import { FilehandlerService } from './services/api/filehandler-controller/filehandler-controller.service';
import { BuildingControllerService } from './services/api/building-controller/building-controller.service';
import { RoomControllerService } from './services/api/room-controller/room-controller.service';
import { BatchFormComponent } from './components/batch-form/batch-form.component';
import { RoomSchedulerComponent } from './components/room-scheduler/room-scheduler.component';
import { RoomAddEventFormComponent } from "./components/room-scheduler/add-event-form/add-event-form.component";
import { MatTableModule } from '@angular/material';
import { EventControllerService } from './services/api/event-controller/event-controller.service';
import { Project3sComponent } from './components/project3s/project3s.component';
import { Project3ControllerService } from './services/api/project3-controller/project3-controller.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    OverviewComponent,
    BatchesComponent,
    LocationsComponent,
    CurriculaComponent,
    TrainersComponent,
    ProfileComponent,
    ReportsComponent,
    SettingsComponent,
    LocationAddLocationDialogComponent,
    LocationDeleteLocationDialogComponent,
    LocationEditLocationDialogComponent,
    LocationAddDialogComponent,
    LocationDeleteBuildingDialogComponent,
    LocationEditBuildingDialogComponent,
    LocationAddRoomDialogComponent,
    LocationDeleteRoomDialogComponent,
    LocationEditRoomDialogComponent,
    LocationOpenUnavailibilityDialogComponent,
    LocationAddUnavailabilityDialogComponent,
    LocationChangeUnavailabilityDialogComponent,
    LoginComponent,
    SkillsComponent,
    CoreComponent,
    BatchesTimelineComponent,
    BatchesTimelineFilterComponent,
    AddSkillComponent,
    EditSkillComponent,
    TrainersAddComponent,
    TrainerItemComponent,
    AuthenticatingComponent,
    CertificationsComponent,
    CurriculumSkillsComponent,
    EditCurriculumComponent,
    LocationDeleteUnavailabilityDialogComponent,
    AddTrainerErrorComponent,
    AddCurriculumComponent,
    BatchFormComponent,
    RoomSchedulerComponent,
    RoomAddEventFormComponent,
    Project3sComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    AppMaterialModule,
    ],

  exports: [AppMaterialModule, RoomAddEventFormComponent],

  providers: [
    S3CredentialService,
    HttpClient,
    UrlService,
    BatchControllerService,
    AddressControllerService,
    CurriculumControllerService,
    SettingControllerService,
    SkillControllerService,
    TrainerControllerService,
    UnavailableControllerService,
    FocusControllerService,
    AuthService,
    GuardService,
    SecurityContext,
    FilehandlerService,
    FillSkillsService,
    CachedObjectsService,
    BuildingControllerService,
    RoomControllerService,
    EventControllerService,
    Project3ControllerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpringXsrfInterceptor,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LocationAddLocationDialogComponent,
    LocationDeleteLocationDialogComponent,
    LocationEditLocationDialogComponent,
    LocationAddDialogComponent,
    LocationDeleteBuildingDialogComponent,
    LocationEditBuildingDialogComponent,
    LocationAddRoomDialogComponent,
    LocationDeleteRoomDialogComponent,
    LocationEditRoomDialogComponent,
    LocationOpenUnavailibilityDialogComponent,
    LocationAddUnavailabilityDialogComponent,
    LocationChangeUnavailabilityDialogComponent,
    EditCurriculumComponent,
    AddSkillComponent,
    EditSkillComponent,
    TrainersAddComponent,
    LocationDeleteUnavailabilityDialogComponent,
    AddTrainerErrorComponent,
    AddCurriculumComponent,
    RoomSchedulerComponent,
    RoomAddEventFormComponent,
  ]
})
export class AppModule {}
