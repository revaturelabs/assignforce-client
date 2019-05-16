import { TestBed, inject } from '@angular/core/testing';

import { SchedulerServiceService } from './scheduler-service.service';

describe('SchedulerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerServiceService]
    });
  });

  it('should be created', inject([SchedulerServiceService], (service: SchedulerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
