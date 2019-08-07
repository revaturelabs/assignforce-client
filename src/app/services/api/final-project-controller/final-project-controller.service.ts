import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../../environments/environment";
import { FinalProject } from "../../../model/FinalProject";

@Injectable()
export class FinalProjectControllerService {

  constructor(private http: HttpClient) {}

  private finalProjectController = environment.apiUrls.finalProjectController;

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
}
