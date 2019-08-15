import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {environment} from "../../../../environments/environment";
import {FinalProject} from "../../../model/FinalProject";

@Injectable()
export class FinalProjectControllerService {

  constructor(private http: HttpClient) {}

  private finalProjectController = environment.apiUrls.finalProjectController;

  // The actual working code:
  /*
  public create(finalProject: FinalProject): Observable<FinalProject> {
    return this.http.post<FinalProject>(
      this.finalProjectController.baseUrl + this.finalProjectController.create, finalProject,
    );
  }
  public update(finalProject: FinalProject): Observable<FinalProject> {
    return this.http.put<FinalProject>(this.finalProjectController.baseUrl + this.finalProjectController.update + finalProject.id, finalProject);
  }

  public findAll(): Observable<FinalProject[]> {
    return this.http.get<FinalProject[]>(this.finalProjectController.baseUrl + this.finalProjectController.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<FinalProject>(this.finalProjectController.baseUrl + this.finalProjectController.remove + id);
  }

  public find(id: number): Observable<FinalProject> {
    return this.http.get<FinalProject>(this.finalProjectController.baseUrl + this.finalProjectController.find + id);
  }
   */

  // The code run for presentation; Hardcoded everything, no persistence:

  private finalProjects = [
    {id: 1, name: "Assign Force", description: "Assign batches to trainers and rooms", isActive: true},
    {
      id: 2,
      name: "Project Force",
      description: "Manage projects creating tasks and assigning them to teams",
      isActive: true
    },
  ];

  public update(finalProject): Observable<FinalProject> {
    return of(finalProject);
  }

  public create(finalProject): Observable<FinalProject> {

    this.finalProjects.push(finalProject);
    finalProject.id = this.finalProjects.length;

    return of(finalProject);
  }

  public find(id: number): Observable<FinalProject> {
    for (const project of this.finalProjects) {
      if (project.id === id) {
        return of(project);
      }
    }
  }

  public findAll(): Observable<FinalProject[]> {
    return of(this.finalProjects);
  }
}
