import { TestBed, inject } from '@angular/core/testing';

import { Project3ControllerService } from './project3-controller.service';

describe('Project3ControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Project3ControllerService]
    });
  });

  it('should be created', inject([Project3ControllerService], (service: Project3ControllerService) => {
    expect(service).toBeTruthy();
  }));
});
