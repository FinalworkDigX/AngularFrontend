import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RoomService {

  private baseUrl =  '/api/v1/room';

  constructor(
    private http: HttpClient
  ) {  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/v1/room');
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room, httpOptions);
  }

  update(room: Room): Observable<Room> {
    console.log('Not Yet Implemented (API SIDE)');
    return of(new Room());
  }

  delete(room: Room) {
    this.http.delete(this.baseUrl + '/' + room.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }

}
