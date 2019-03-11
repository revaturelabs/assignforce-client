import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Curriculum } from '../../../model/Curriculum';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurriculumControllerService {
  constructor(private http: HttpClient) {}

  private curriculumController = environment.apiUrls.curriculumController;

  public create(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(
      this.curriculumController.baseUrl + this.curriculumController.create,curriculum
    );
  }
  public update(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.put<Curriculum>(
      this.curriculumController.baseUrl + this.curriculumController.update + curriculum.id,curriculum
    );
  }
  public findAll(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(this.curriculumController.baseUrl + this.curriculumController.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<Curriculum>(this.curriculumController.baseUrl + this.curriculumController.remove + id);
  }

  public find(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.curriculumController.baseUrl + this.curriculumController.find + id);
  }
}
