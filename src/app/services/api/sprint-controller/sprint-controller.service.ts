import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../../environments/environment";
import {Sprint} from "../../../model/Sprint";

@Injectable()
export class SprintControllerService {

  constructor(private http: HttpClient) {}

  private sprintService = environment.apiUrls.sprintService;

  public create(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(
      this.sprintService.baseUrl + this.sprintService.create, sprint,
    );
  }

  // tslint:disable-next-line:one-line
  createSprint(name, body, callback) {
    /* not implemented */
  }

  // tslint:disable-next-line:one-line
  getAll(name: string): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.sprintService.baseUrl}/${name}/sprints`);
  }

}
