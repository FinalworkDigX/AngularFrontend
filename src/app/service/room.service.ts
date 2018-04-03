import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from '../model/room';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {

  constructor(
    private http: HttpClient
  ) {  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>('/api/v1/room');
  }

  create(room: Room) {
    //
  }

  update(room: Room) {
    //
  }

  delete(room: Room) {
    //
  }

}
