import { TestBed, inject } from '@angular/core/testing';

import { UrlService } from './url.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
describe('UrlService', () => {
  let urlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UrlService]
    });
    urlService = TestBed.get(UrlService);
  });

  it('should be created', inject([UrlService], (service: UrlService) => {
    expect(service).toBeTruthy();
  }));

  it('should return base url when getBaseUrl is called', () => {
    expect(urlService.getBaseUrl()).toBe(environment.baseUrl);
  });

  it('should return login url when getLoginUrl is called', () => {
    expect(urlService.getLoginUrl()).toBe(environment.appRoutes.login);
  });

  it('should return overview url when getOverviewUrl is called', () => {
    expect(urlService.getOverviewUrl()).toBe(environment.appRoutes.overview);
  });

  it('should return batches url when getBatchesUrl is called', () => {
    expect(urlService.getBatchesUrl()).toBe(environment.appRoutes.batches);
  });

  it('should return locations url when getLocationUrl is called', () => {
    expect(urlService.getLocationsUrl()).toBe(environment.appRoutes.locations);
  });

  it('should return curricula url when getCurriculaUrl is called', () => {
    expect(urlService.getCurriculaUrl()).toBe(environment.appRoutes.curricula);
  });

  it('should return trainers url when getTrainersUrl is called', () => {
    expect(urlService.getTrainersUrl()).toBe(environment.appRoutes.trainers);
  });

  it('should return profile url when getProfileUrl is called', () => {
    expect(urlService.getProfileUrl()).toBe(environment.appRoutes.profile);
  });

  it('should return reports url when getReportsUrl is called', () => {
    expect(urlService.getReportsUrl()).toBe(environment.appRoutes.reports);
  });

  it('should return settings url when getSettingsUrl is called', () => {
    expect(urlService.getSettingsUrl()).toBe(environment.appRoutes.settings);
  });
});
