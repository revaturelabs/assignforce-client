import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Room } from '../../../model/Room';
import { Unavailability } from '../../../model/Unavailability';

@Injectable()
export class RoomControllerService {
  constructor(private http: HttpClient) {}

  private roomController = environment.apiUrls.roomController;

  private generateDTO(room: Room): any {
    const unavailabilities: Unavailability[] = [];
    room.unavailabilities.forEach(unavail => {
      unavailabilities.push(unavail);
    });
    return {
      id: room.id,
      active: room.active,
      roomName: room.roomName,
      building: room.building,
      unavailabilities: unavailabilities
    };
  }

  public create(room: Room): Observable<Room> {
      return this.http.post<Room>(this.roomController.baseUrl + this.roomController.create, this.generateDTO(room));
  }
  public update(room: Room): Observable<Room> {
    return this.http.put<Room>(this.roomController.baseUrl + this.roomController.update + room.id, this.generateDTO(room));
  }
  public findAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomController.baseUrl + this.roomController.findAll);
  }
  public remove(id: number): Observable<any> {
    return this.http.delete<Room>(this.roomController.baseUrl + this.roomController.remove + id);
  }
  public find(id: number): Observable<Room> {
    return this.http.get<Room>(this.roomController.baseUrl + this.roomController.find + id);
  }
}
