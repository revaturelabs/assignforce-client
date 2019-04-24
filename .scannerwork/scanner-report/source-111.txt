import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Building } from '../../../model/Building';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BuildingControllerService {

  constructor(private http: HttpClient) {}

  private buildingController = environment.apiUrls.buildingController;

  public create(building: Building): Observable<Building> {
    console.log("create building", building);
    console.log(this.buildingController.baseUrl + this.buildingController.create);
    return this.http.post<Building>(this.buildingController.baseUrl + this.buildingController.create, building);
  }
  public update(building: Building): Observable<Building> {
    return this.http.put<Building>(this.buildingController.baseUrl + this.buildingController.update + building.buildingId, building);
  }
  public findAll(): Observable<Building[]> {
    return this.http.get<Building[]>(this.buildingController.baseUrl + this.buildingController.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<Building>(this.buildingController.baseUrl + this.buildingController.remove + id);
  }
  public find(id: number): Observable<Building> {
    return this.http.get<Building>(this.buildingController.baseUrl + this.buildingController.find + id);
  }

}
