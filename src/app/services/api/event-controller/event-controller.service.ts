import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Event } from '../../../model/Event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventControllerService {
  constructor(private http: HttpClient) {}

  private eventController = environment.apiUrls.eventController;

  /**
   * Need to send the room id in the url because  the Unavailability bean on the java side
   * cannot have it's room's field changed (because the room field is updatable=false and insertable=false)).
   * The only way of setting the room field is by adding a Room instance to the roomObject field, in order to
   * accomplish that we need to send the room id through the url. (This applies for both update and create)
   *
   */
  public create(event: Event): Observable<Event> {
    console.log('in create');
    return this.http.post<Event>(
      this.eventController.baseUrl + this.eventController.create, event
    );
  }
  public update(event: Event): Observable<Event> {
    return this.http.put<Event>(
      this.eventController.baseUrl + this.eventController.update,
      event
    );
  }
  public findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventController.baseUrl + this.eventController.findAll);
  }
  public remove(id: number): Observable<any> {
    console.log('in remove controller');
    return this.http.delete<Event>(
      this.eventController.baseUrl + this.eventController.remove + id
    );
  }

  public find(id: number): Observable<Event> {
    return this.http.get<Event>(this.eventController.baseUrl + this.eventController.find + id);
  }
}
