import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Beacon } from '../model/beacon';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class BeaconService {

  private baseUrl = environment.apiUrl + '/v1/beacon';

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
    return this.http.put<Beacon>(this.baseUrl, beacon, this.sessionService.httpOptions);
  }

  delete(beacon: Beacon) {
    this.http.delete(this.baseUrl + '/' + beacon.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
