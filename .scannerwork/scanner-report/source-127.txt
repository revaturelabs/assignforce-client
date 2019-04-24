import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class S3CredentialService {
  url = '/api/v2/s3Creds';

  constructor(private http: HttpClient) {}

  getCreds(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
