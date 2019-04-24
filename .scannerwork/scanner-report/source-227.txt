import { TestBed, inject, async } from '@angular/core/testing';

import { FillSkillsService } from './fill-skills.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SkillControllerService } from './skill-controller.service';
import { TrainerControllerService } from './../trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from './../curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from './../focus-controller/focus-controller.service';

describe('FillSkillsService', () => {

  let service: SkillControllerService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [FocusControllerService, CurriculumControllerService, TrainerControllerService, SkillControllerService, FillSkillsService, HttpClient, HttpHandler]
    });
      service = TestBed.get(SkillControllerService);
  });



  it('should be created', inject([FillSkillsService], (service: FillSkillsService) => {
    expect(service).toBeTruthy();
  }));
});
