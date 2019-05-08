import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod.in-mem-db';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchedulerControllerService {

  constructor(private http: HttpClient) { }

}
