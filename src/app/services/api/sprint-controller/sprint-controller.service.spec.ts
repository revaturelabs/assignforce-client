import { inject, TestBed } from "@angular/core/testing";

import { SprintControllerService } from "./sprint-controller.service";

describe("SprintService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprintControllerService],
    });
  });

  it("should be created", inject([SprintControllerService], (service: SprintControllerService) => {
    expect(service).toBeTruthy();
  }));
});
