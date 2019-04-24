import { Injectable } from '@angular/core';
import { Batch } from '../../../model/Batch';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BatchControllerService {
  constructor(private http: HttpClient) {}

  private batchController = environment.apiUrls.batchController;

  public create(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.batchController.baseUrl}${this.batchController.create}`, {
      name: batch.name,
      startDate: batch.startDate,
      endDate: batch.endDate,
      curriculum: batch.curriculum,
      trainer: batch.trainer ? batch.trainer : null,
      cotrainer: batch.cotrainer ? batch.cotrainer : null,
      skills: batch.skills,
      location: batch.location ? batch.location : null,
      building: batch.building ? batch.building : null,
      room: batch.room ? batch.room : null,
      classSize: batch.classSize ? batch.classSize : null
    });
  }
  public update(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.batchController.baseUrl + this.batchController.update + batch.id, {
      id: batch.id,
      name: batch.name,
      startDate: batch.startDate,
      endDate: batch.endDate,
      curriculum: batch.curriculum,
      trainer: batch.trainer ? batch.trainer : null,
      cotrainer: batch.cotrainer ? batch.cotrainer : null,
      classSize: batch.classSize ? batch.classSize : null,
      skills: batch.skills,
      location: batch.location,
      building: batch.building ? batch.building : null,
      room : batch.room ? batch.room : null
    });
  }
  public findAll(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.batchController.baseUrl + this.batchController.findAll);
  }
  public remove(id: number): Observable<any>{
    return this.http.delete<Batch>(this.batchController.baseUrl + this.batchController.remove + id)
  }
  public find(id: number): Observable<Batch> {
    return this.http.get<Batch>(this.batchController.baseUrl + this.batchController.find + id);
  }
}
