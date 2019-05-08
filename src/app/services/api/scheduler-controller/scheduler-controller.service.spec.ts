import { TestBed, inject } from '@angular/core/testing';

import { SchedulerControllerService } from './scheduler-controller.service';

describe('SchedulerControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerControllerService]
    });
  });

  it('should be created', inject([SchedulerControllerService], (service: SchedulerControllerService) => {
    expect(service).toBeTruthy();
  }));
});
