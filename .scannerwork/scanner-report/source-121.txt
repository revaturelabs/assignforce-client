import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Trainer } from '../../../model/Trainer';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/scheduler/Action';
import {Skill} from "../../../model/Skill";
import {Unavailability} from "../../../model/Unavailability";

@Injectable()
export class TrainerControllerService {
  constructor(private http: HttpClient) {}

  private trainerController = environment.apiUrls.trainerController;

  public create(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(
      this.trainerController.baseUrl + this.trainerController.create,trainer
    );
  }
  public update(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(this.trainerController.baseUrl + this.trainerController.update + trainer.id, trainer);
  }

  public findAll(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.trainerController.baseUrl + this.trainerController.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<Trainer>(this.trainerController.baseUrl + this.trainerController.remove + id);
  }

  public find(id: number): Observable<Trainer> {
    return this.http.get<Trainer>(this.trainerController.baseUrl + this.trainerController.find + id);
  }

  public findByEmail(email: string) {
    return this.http.get<Trainer>(this.trainerController.baseUrl + `/email/${email}`);
  }
}
