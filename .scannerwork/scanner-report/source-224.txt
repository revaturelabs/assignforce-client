import { TestBed, inject } from '@angular/core/testing';

import { FocusControllerService } from './focus-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FocusControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FocusControllerService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([FocusControllerService], (service: FocusControllerService) => {
    expect(service).toBeTruthy();
  }));
});
