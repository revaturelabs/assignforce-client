import { TestBed, inject } from '@angular/core/testing';

import { BatchControllerService } from './batch-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BatchControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatchControllerService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([BatchControllerService], (service: BatchControllerService) => {
    expect(service).toBeTruthy();
  }));
});
