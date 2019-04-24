import { TestBed, inject } from '@angular/core/testing';

import { FilehandlerService } from './filehandler-controller.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FilehandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilehandlerService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([FilehandlerService], (service: FilehandlerService) => {
    expect(service).toBeTruthy();
  }));
});
