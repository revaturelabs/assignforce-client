import { TestBed , inject } from '@angular/core/testing';
import { SchedulerControllerService } from './scheduler-controller.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http/'

describe('SchedulerControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SchedulerControllerService]
    });
  });

  it('should be created', inject([SchedulerControllerService], (service: SchedulerControllerService) => {
    expect(service).toBeTruthy();
  }));
});
