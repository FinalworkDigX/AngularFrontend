import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Beacon } from '../model/beacon';
import { SessionService } from './session.service';

@Injectable()
export class BeaconService {

  private baseUrl =  '/api/v1/beacon';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {  }

  getAll(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(this.baseUrl, this.sessionService.httpOptions);
  }

  create(beacon: Beacon): Observable<Beacon> {
    return this.http.post<Beacon>(this.baseUrl, beacon, this.sessionService.httpOptions);
  }

  update(beacon: Beacon): Observable<Beacon> {
    console.log('Not Yet Implemented (API SIDE)');
    return of(new Beacon());
  }

  delete(beacon: Beacon) {
    this.http.delete(this.baseUrl + '/' + beacon.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
