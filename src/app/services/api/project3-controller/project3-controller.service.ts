import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Project3 } from '../../../model/Project3';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Project3ControllerService {

  constructor(private http: HttpClient) {}

  private project3Controller = environment.apiUrls.project3Controller;

  public create(project3: Project3): Observable<Project3> {
    return this.http.post<Project3>(
      this.project3Controller.baseUrl + this.project3Controller.create, project3
    );
  }
  public update(project3: Project3): Observable<Project3> {
    return this.http.put<Project3>(this.project3Controller.baseUrl + this.project3Controller.update + project3.id, project3);
  }

  public findAll(): Observable<Project3[]> {
    return this.http.get<Project3[]>(this.project3Controller.baseUrl + this.project3Controller.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<Project3>(this.project3Controller.baseUrl + this.project3Controller.remove + id);
  }

  public find(id: number): Observable<Project3> {
    return this.http.get<Project3>(this.project3Controller.baseUrl + this.project3Controller.find + id);
  }
}
