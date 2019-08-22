import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../environments/environment";
import {AddSprintComponent} from "./components/add-sprint/add-sprint.component";
import { AuthenticatingComponent } from "./components/authenticating/authenticating.component";
import { BatchesComponent } from "./components/batches/batches.component";
import { CurriculaComponent } from "./components/curricula/curricula.component";
import { FinalProjectsComponent } from "./components/final-projects/final-projects.component";
import { LocationsComponent } from "./components/locations/locations.component";
import { LoginComponent } from "./components/login/login.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { RoomSchedulerComponent } from "./components/room-scheduler/room-scheduler.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { TrainersComponent } from "./components/trainers/trainers.component";
import { GuardService as AuthGuard } from "./services/auth/guard.service";

const appRoutes: Routes = [
  {
    path: environment.appRoutes.login,
    component: LoginComponent,
  },
  {
    path: environment.appRoutes.callback,
    component: AuthenticatingComponent,
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        path: environment.appRoutes.overview,
        component: OverviewComponent,
      },
      {
        path: environment.appRoutes.batches,
        component: BatchesComponent,
      },
      {
        path: environment.appRoutes.locations,
        component: LocationsComponent,
      },
      {
        path: environment.appRoutes.curricula,
        component: CurriculaComponent,
      },
      {
        path: environment.appRoutes.trainers,
        component: TrainersComponent,
      },
      {
        path: environment.appRoutes.trainers + "/:email",
        component: ProfileComponent,
      },
      {
        path: environment.appRoutes.profile + "/:email",
        component: ProfileComponent,
      },
      {
        path: environment.appRoutes.reports,
        component: ReportsComponent,
      },
      {
        path: environment.appRoutes.settings,
        component: SettingsComponent,
      },
       {
        path: environment.appRoutes.roomScheduler,
        component: RoomSchedulerComponent,
      },
      {
        path: environment.appRoutes.finalProjects,
        component: FinalProjectsComponent,
      },
      {
        path: environment.appRoutes.sprint + "/:name",
        component: AddSprintComponent,
      },
      {
        path: "**",
        redirectTo: environment.appRoutes.overview,
      },
    ],
  },
  {
    path: "**",
    redirectTo: environment.appRoutes.login,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouting {}
