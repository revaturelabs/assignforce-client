import { TestBed, inject } from '@angular/core/testing';

import { FinalProjectControllerService } from './final-project-controller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FinalProjectControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalProjectControllerService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([FinalProjectControllerService], (service: FinalProjectControllerService) => {
    expect(service).toBeTruthy();
  }));
});
