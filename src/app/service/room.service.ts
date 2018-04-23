import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { SessionService } from './session.service';
import { DataSource } from '../model/data-source';

@Injectable()
export class RoomService {

  private baseUrl =  '/api/v1/room';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl, this.sessionService.httpOptions);
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room, this.sessionService.httpOptions);
  }

  update(room: Room): Observable<Room> {
    return this.http.put<Room>(this.baseUrl, room, this.sessionService.httpOptions);
  }

  delete(room: Room) {
    this.http.delete(this.baseUrl + '/' + room.id, this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }

}
