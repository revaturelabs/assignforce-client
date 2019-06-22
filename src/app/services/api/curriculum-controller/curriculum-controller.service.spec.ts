import { TestBed, inject } from '@angular/core/testing';
import { CurriculumControllerService } from './curriculum-controller.service';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Curriculum } from '../../../model/Curriculum';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Skill } from '../../../model/Skill';
import { environment } from '../../../../environments/environment';

describe('CurriculumControllerService', () => {
  let httpTestingController: HttpTestingController;
  let curriculumControllerService: CurriculumControllerService;
  let curriculum: Curriculum[];
  const curriculumUrl = environment.apiUrls.curriculumController;
  
  const testSkillData: Skill[] = [
    new Skill(1,"skill1", true),
    new Skill(2, "skill2", true),
    new Skill(3, "skill3", false)
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurriculumControllerService, HttpClient]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    curriculumControllerService = TestBed.get(CurriculumControllerService);

    curriculum = [
      new Curriculum(1, 'Test Curriculum', true, true, [new Skill(1, "skill1", true)]),
      new Curriculum(2, 'Test Curriculum 2', true, false, [new Skill(2, "skill2", true)])
    ];
  });

  it('should be created', inject([CurriculumControllerService], (service: CurriculumControllerService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    // Verifies all HTTP requests have been handled
    httpTestingController.verify();
  });

  // Create
  it('should create a curriculum', () => {
    const newCurriculum: Curriculum = {
      id: 500,
      name: 'string',
      isActive: true,
      isCore: true,
      skills: [testSkillData[1], testSkillData[2]]
    };

    curriculumControllerService.create(newCurriculum).subscribe(resp => {
      expect(resp).toEqual(newCurriculum);
    });

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.create);
    expect(req.request.method).toBe('POST');
    curriculum.push(req.request.body);
    const dataSize = curriculum.length;
    req.flush(curriculum[dataSize-1]);
  })

  // Update
  it('should update an existing unavailability', () => {
    const updatedCurriculum: Curriculum = {
      id: 500,
      name: 'string',
      isActive: true,
      isCore: true,
      skills: [testSkillData[1], testSkillData[2]]
    };

    curriculumControllerService.update(updatedCurriculum).subscribe(resp => {
      expect(resp).toEqual(updatedCurriculum);
    });

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.update + updatedCurriculum.id);
    expect(req.request.method).toBe('PUT');
    const curriculumIndex = curriculum.findIndex(curriculum => curriculum.id === req.request.body.id);
    curriculum[curriculumIndex] = req.request.body;
    req.flush(curriculum[curriculumIndex]);
  });

  // Remove
  it('should remove an should delete a curriculum', () => {
    const removeParam = 3;
    curriculumControllerService.remove(removeParam).subscribe(resp => {
      expect(resp).toEqual(
        [
          {
            "id": 1,
            "name": "Test Curriculum",
            "isActive": true,
            "isCore": true,
            "skills": [{
              "isActive": true,
              "id": 1,
              "name": "skill1"
            }]
          }
        ]
      )
    });

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.remove + removeParam);
    expect(req.request.method).toBe('DELETE');
    const removedIndex = curriculum.findIndex(curriculum => curriculum.id === removeParam);
    curriculum.splice(removedIndex, 1);
    req.flush(curriculum);
  });

  // Find
  it('should find a specific curriculum', () => {
    const findParam = 1;

    curriculumControllerService.find(findParam).subscribe(resp => {
      expect(resp).toEqual(curriculum[0]);
    });

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.find + findParam);
    expect(req.request.method).toBe('GET');
    const foundIndex = curriculum.findIndex(curriculum => curriculum.id === findParam);
    req.flush(curriculum[foundIndex]);
  });

  // Find All
  it('should find all curriculums', () => {
    curriculumControllerService.findAll().subscribe(resp => {
      expect(resp).toEqual(curriculum);
    });

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.findAll);
    expect(req.request.method).toBe('GET');
    req.flush(curriculum);
  });

  // Error
  it('should receive an error after trying to find a curriculum that does not exist', () => {
    const errmsg = 'Something went wrong. Unless you wanted it to. In that case it went right.';
    const findParam = 250;

    curriculumControllerService.find(250).subscribe(resp =>
      fail('should have failed with a 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errmsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(curriculumUrl.baseUrl + curriculumUrl.find + findParam);
    req.flush(errmsg, {status: 404, statusText: 'Not Found'});
  });
});
