import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.post("https://api.github.com/repos/revaturelabs/assignforce/projects", {name: "name", body: "This is a test description."},
      { headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Replace with authentication token in the slack. Do not commit the token to the repository without permission.",
          "Accept": "application/vnd.github.inertia-preview+json"})})
      .subscribe((res) => {
        console.log(res);
      });
  }

  // tslint:disable-next-line:one-line
   getSprint(){
    // @ts-ignore
     let sprints;

     this.http.get<Sprint[]>("https://api.github.com/repos/revaturelabs/assignforce/projects")
      .subscribe((resp) => {
        sprints = resp;
      });

     while (!sprints) {}

     return sprints;
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
