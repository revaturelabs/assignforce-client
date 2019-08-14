
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { inject, TestBed } from "@angular/core/testing";
import {Sprint} from "../../../model/Sprint";
import { SprintControllerService } from "./sprint-controller.service";

describe("SprintService", () => {

  let httpTestingController: HttpTestingController;
  let sprintControllerService: SprintControllerService;
  let sprints: Sprint[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SprintControllerService, HttpClient],
    });
  });

  httpTestingController = TestBed.get(HttpTestingController);
  sprintControllerService = TestBed.get(SprintControllerService);

  sprints = [
  new Sprint(1, "TestSprint", "Testing", false),
  ]

  it("should be created", inject([SprintControllerService], (service: SprintControllerService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    // Verifies all HTTP requests have been handled
    httpTestingController.verify();
  });

  it("should find all sprints", () => {
    sprintControllerService.getAll().subscribe((resp) => {
      expect(resp).toEqual(sprints);
    });

    const req = httpTestingController.expectOne("https://api.github.com/repos/revaturelabs/assignforce/projects?state=all");
    expect(req.request.method).toBe("GET");
    req.flush(sprints);
  });

});
