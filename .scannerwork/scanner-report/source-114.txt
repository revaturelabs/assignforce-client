import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Trainer } from '../../../model/Trainer';

@Injectable()
export class FilehandlerService {
  constructor(private http: HttpClient) {}

  private filehandlerService = environment.apiUrls.filehandlerController;

  public download(trainer: Trainer): Observable<any> {
    const id = trainer.id;
    return this.http.get(this.filehandlerService.baseUrl + this.filehandlerService.find + id);
  }
}
