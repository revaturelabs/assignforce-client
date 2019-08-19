import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {Sprint} from "../../../model/sprint";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class SprintControllerService {
  private readonly _authToken = "token ";

  // consider moving this elsewhere if any other part of the application needs a cookie.
  private getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.startsWith(cname)) {
        return (c.split("=")[1]);
      }
    }
    return "";
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

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
      "Authorization": this.getCookie("SprintRepoAuthToken"),
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
    console.log(this.cookieService.get("SprintRepoAuthToken"));
    return this.http.get<Sprint[]>("https://api.github.com/repos/revaturelabs/assignforce/projects?state=all",
    { headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.cookieService.get("SprintRepoAuthToken"),
      "Accept": "application/vnd.github.inertia-preview+json"})});

  }

}
