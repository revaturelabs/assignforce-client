
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { async, inject, TestBed } from "@angular/core/testing";
import {Sprint} from "../../../model/Sprint";
import { SprintControllerService } from "./sprint-controller.service";
import { CookieService } from "ngx-cookie-service";

describe("SprintService", () => {

  let httpTestingController: HttpTestingController;
  let sprintControllerService: SprintControllerService;
  let sprints: Sprint[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SprintControllerService, HttpClient, CookieService],
    });
  }));

  beforeEach(async(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    sprintControllerService = TestBed.get(SprintControllerService);
  }));

  sprints = [
  new Sprint(1, "TestSprint", "Testing", false),
  ];

  it("should be created", inject([SprintControllerService], (service: SprintControllerService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    // Verifies all HTTP requests have been handled
    httpTestingController.verify();
  });

  it("should find all sprints", () => {
    document.cookie = "SprintRepoAuthToken=1xb734;";
    sprintControllerService.getAll().subscribe((resp) => {
      expect(resp).toEqual(sprints);
    });

    const req = httpTestingController.expectOne("https://api.github.com/repos/revaturelabs/assignforce/projects?state=all");
    expect(req.request.method).toBe("GET");
    req.flush(sprints);
  });

});
