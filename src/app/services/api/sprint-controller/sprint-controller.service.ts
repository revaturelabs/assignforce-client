import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {FinalProject} from "../../../model/FinalProject";
import {Sprint} from "../../../model/sprint";

@Injectable()
export class SprintControllerService {

  createSprintUrl = "https://api.github.com/repos/revaturelabs/assignforce";

  constructor(private http: HttpClient) {}

  private sprintService = environment.apiUrls.sprintService;

  public create(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(
      this.sprintService.baseUrl + this.sprintService.create, sprint,
    );
  }
  // tslint:disable-next-line:one-line
  createSprint(){
    return this.http.post("https://api.github.com/repos/revaturelabs/assignforce", {name: "name", description: "description"})
      .map((res: Response) => res.json());
  }

  // tslint:disable-next-line:one-line
   getSprint(){
    // @ts-ignore
    return this.http.get("https://api.github.com/repos/revaturelabs/assignforce/projects")
      .map((res: Response) => res.json());
  }

  submit(name, description) {
    const data =
      // tslint:disable-next-line:one-line
      {
         name,
        description,
      };
    console.log(data);
    this.http.post(this.createSprintUrl, data).subscribe();
  }

}
