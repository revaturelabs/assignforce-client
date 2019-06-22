import { TestBed, inject } from '@angular/core/testing';

import { FinalProjectControllerService } from './final-project-controller.service';

describe('FinalProjectControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalProjectControllerService]
    });
  });

  it('should be created', inject([FinalProjectControllerService], (service: FinalProjectControllerService) => {
    expect(service).toBeTruthy();
  }));
});
