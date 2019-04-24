import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './components/overview/overview.component';
import { BatchesComponent } from './components/batches/batches.component';
import { LocationsComponent } from './components/locations/locations.component';
import { CurriculaComponent } from './components/curricula/curricula.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticatingComponent } from './components/authenticating/authenticating.component';
import { GuardService as AuthGuard } from './services/auth/guard.service';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: environment.appRoutes.login,
    component: LoginComponent
  },
  {
    path: environment.appRoutes.callback,
    component: AuthenticatingComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: environment.appRoutes.overview,
        component: OverviewComponent
      },
      {
        path: environment.appRoutes.batches,
        component: BatchesComponent
      },
      {
        path: environment.appRoutes.locations,
        component: LocationsComponent
      },
      {
        path: environment.appRoutes.curricula,
        component: CurriculaComponent
      },
      {
        path: environment.appRoutes.trainers,
        component: TrainersComponent
      },
      {
        path: environment.appRoutes.trainers + '/:email',
        component: ProfileComponent
      },
      {
        path: environment.appRoutes.profile + '/:email',
        component: ProfileComponent
      },
      {
        path: environment.appRoutes.reports,
        component: ReportsComponent
      },
      {
        path: environment.appRoutes.settings,
        component: SettingsComponent
      },
      {
        path: '**',
        redirectTo: environment.appRoutes.overview
      }
    ]
  },
  {
    path: '**',
    redirectTo: environment.appRoutes.login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting {}
