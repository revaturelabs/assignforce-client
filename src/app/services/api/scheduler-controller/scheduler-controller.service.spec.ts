import { TestBed , inject } from '@angular/core/testing';
import { SchedulerControllerService } from './scheduler-controller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SchedulerControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerControllerService, HttpClientTestingModule]
    });
  });

  it('should be created', inject([SchedulerControllerService], (service: SchedulerControllerService) => {
    expect(service).toBeTruthy();
  }));
});
