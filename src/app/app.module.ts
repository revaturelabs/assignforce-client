import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import {
  LocationAddLocationDialogComponent,
  LocationAddRoomDialogComponent,
  LocationDeleteBuildingDialogComponent,
  LocationDeleteLocationDialogComponent,
  LocationDeleteRoomDialogComponent,
  LocationEditBuildingDialogComponent,
  LocationEditLocationDialogComponent,
  LocationEditRoomDialogComponent,
  LocationsComponent,
  LocationOpenUnavailibilityDialogComponent,
  LocationAddUnavailabilityDialogComponent,
  LocationChangeUnavailabilityDialogComponent,
  LocationDeleteUnavailabilityDialogComponent
} from './components/locations/locations.component';
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
    LocationAddDialogComponent, // LocationAddBuildingDialogComponent,
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
    AddCurriculumComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    AppMaterialModule
    //InMemoryWebApiModule.forRoot(InMemDbService)
  ],

  exports: [AppMaterialModule],

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
    AddCurriculumComponent
  ]
})
export class AppModule {}
