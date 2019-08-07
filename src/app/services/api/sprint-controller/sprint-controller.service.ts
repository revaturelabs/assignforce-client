import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {FinalProject} from "../../../model/FinalProject";
import {Sprint} from "../../../model/sprint";

@Injectable()
export class SprintControllerService {
  private static readonly _authToken = "token {replace with proper token.}";

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
    return this.http.post("https://api.github.com/repos/revaturelabs/assignforce/projects", {name: "name", body: "This is a test description."},
      { headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": SprintControllerService._authToken,
          "Accept": "application/vnd.github.inertia-preview+json"})})
      .subscribe((res) => {
        console.log(res);
      });
  }

  // tslint:disable-next-line:one-line
  getAll(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>("https://api.github.com/repos/revaturelabs/assignforce/projects",
    { headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": SprintControllerService._authToken,
      "Accept": "application/vnd.github.inertia-preview+json"})});

  }

}
