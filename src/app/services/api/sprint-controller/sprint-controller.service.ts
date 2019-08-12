import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {Sprint} from "../../../model/sprint";

@Injectable()
export class SprintControllerService {
  private static readonly _authToken = "token 8bbd08e64c5b17bdff15c1ef90c252870006c2f2";

  createSprintUrl = "https://api.github.com/repos/revaturelabs/assignforce";

  constructor(private http: HttpClient) {}

  private sprintService = environment.apiUrls.sprintService;

  public create(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(
      this.sprintService.baseUrl + this.sprintService.create, sprint,
    );
  }

  // tslint:disable-next-line:one-line
  createSprint(name, body, callback) {
    const RequestHeaders = { headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": SprintControllerService._authToken,
      "Accept": "application/vnd.github.inertia-preview+json"})};

    return this.http.post("https://api.github.com/repos/revaturelabs/assignforce/projects", {name, body},
      RequestHeaders)
      .subscribe((resp: any) => {
        const url = "https://api.github.com/projects/" + resp.id + "/columns";

        const _ = () => {};

        this.http.post(url, {name: "Backlog"}, RequestHeaders).subscribe(_);
        this.http.post(url, {name: "In Progress"}, RequestHeaders).subscribe(_);
        this.http.post(url, {name: "Testing"}, RequestHeaders).subscribe(_);
        this.http.post(url, {name: "Done"}, RequestHeaders).subscribe(_);
        callback();
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
