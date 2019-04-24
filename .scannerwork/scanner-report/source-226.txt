import { TestBed, inject } from '@angular/core/testing';

import { SettingControllerService } from './setting-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SettingControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingControllerService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([SettingControllerService], (service: SettingControllerService) => {
    expect(service).toBeTruthy();
  }));
});
