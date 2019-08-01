import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class UrlService {
  constructor() {}

  getBaseUrl(): string {
    return environment.baseUrl;
  }

  getLoginUrl(): string {
    return environment.appRoutes.login;
  }

  getOverviewUrl(): string {
    return environment.appRoutes.overview;
  }

  getBatchesUrl(): string {
    return environment.appRoutes.batches;
  }

  getLocationsUrl(): string {
    return environment.appRoutes.locations;
  }

  getCurriculaUrl(): string {
    return environment.appRoutes.curricula;
  }

  getTrainersUrl(): string {
    return environment.appRoutes.trainers;
  }

  getProfileUrl(): string {
    return environment.appRoutes.profile;
  }

  getReportsUrl(): string {
    return environment.appRoutes.reports;
  }

  getSettingsUrl(): string {
    return environment.appRoutes.settings;
  }

  getRoomSchedulerUrl(): string {
    return environment.appRoutes.roomScheduler;
  }

  getFinalProjectUrl(): string {
    return environment.appRoutes.finalProjects;
  }

  getSprintUrl(): string {
    return environment.appRoutes.sprint;
  }
}
