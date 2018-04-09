import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { SessionService } from './session.service';

@Injectable()
export class RoomService {

  private baseUrl =  '/api/v1/room';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/v1/room', this.sessionService.httpOptions);
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room, this.sessionService.httpOptions);
  }

  update(room: Room): Observable<Room> {
    console.log('Not Yet Implemented (API SIDE)');
    return of(new Room());
  }

  delete(room: Room) {
    this.http.delete(this.baseUrl + '/' + room.id, this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }

}
