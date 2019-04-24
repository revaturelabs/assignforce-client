import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Unavailability } from '../../../model/Unavailability';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnavailableControllerService {
  constructor(private http: HttpClient) {}

  private unavailableController = environment.apiUrls.unavailableController;

  /**
   * Need to send the room id in the url because  the Unavailability bean on the java side
   * cannot have it's room's field changed (because the room field is updatable=false and insertable=false)).
   * The only way of setting the room field is by adding a Room instance to the roomObject field, in order to
   * accomplish that we need to send the room id through the url. (This applies for both update and create)
   *
   */
  public create(unavailable: Unavailability): Observable<Unavailability> {
    console.log('in create');
    return this.http.post<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.create, unavailable
    );
  }
  public update(unavailable: Unavailability): Observable<Unavailability> {
    return this.http.put<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.update,
      unavailable
    );
  }
  public findAll(): Observable<Unavailability[]> {
    return this.http.get<Unavailability[]>(this.unavailableController.baseUrl + this.unavailableController.findAll);
  }
  public remove(id: number): Observable<any> {
    console.log('in remove controller');
    return this.http.delete<Unavailability>(
      this.unavailableController.baseUrl + this.unavailableController.remove + id
    );
  }

  public find(id: number): Observable<Unavailability> {
    return this.http.get<Unavailability>(this.unavailableController.baseUrl + this.unavailableController.find + id);
  }
}
