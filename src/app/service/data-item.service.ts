import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataItem } from '../model/data-item';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class DataItemService {

  private baseUrl = environment.apiUrl + '/v1/dataItem';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getAll(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.baseUrl, this.sessionService.httpOptions);
  }

  create(dataItem: DataItem): Observable<DataItem> {
    return this.http.post<DataItem>(this.baseUrl, dataItem, this.sessionService.httpOptions);
  }

  update(dataItem: DataItem): Observable<DataItem> {
    return this.http.put<DataItem>(this.baseUrl, dataItem, this.sessionService.httpOptions);
  }

  delete(dataItem: DataItem) {
    this.http.delete(this.baseUrl + '/' + dataItem.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
