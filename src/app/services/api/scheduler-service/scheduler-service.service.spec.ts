import { TestBed, inject } from '@angular/core/testing';

import { SchedulerServiceService } from './scheduler-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SchedulerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerServiceService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', inject([SchedulerServiceService], (service: SchedulerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
