import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SprintControllerService {
  constructor(private http: HttpClient) {}
}
