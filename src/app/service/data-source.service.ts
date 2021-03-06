import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '../model/data-source';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class DataSourceService {

  private baseUrl = environment.apiUrl + '/v1/dataSource';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getAll(): Observable<DataSource[]> {
    return this.http.get<DataSource[]>(this.baseUrl, this.sessionService.httpOptions);
  }

  restartClient() {
    this.http.get(this.baseUrl + '/restartClient', this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }

  create(dataSource: DataSource): Observable<DataSource> {
    return this.http.post<DataSource>(this.baseUrl, dataSource, this.sessionService.httpOptions);
  }

  update(dataSource: DataSource): Observable<DataSource> {
    return this.http.put<DataSource>(this.baseUrl, dataSource, this.sessionService.httpOptions);
  }

  delete(dataSource: DataSource) {
    this.http.delete(this.baseUrl + '/' + dataSource.id, this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
