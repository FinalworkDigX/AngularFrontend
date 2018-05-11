import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataItem } from '../model/data-item';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { DataItemRequest } from '../model/data-item-request';

@Injectable()
export class DataItemRequestService {

  private baseUrl = '/api/v1/request';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getAll(): Observable<DataItemRequest[]> {
    return this.http.get<DataItemRequest[]>(this.baseUrl + '/getForAdmin', this.sessionService.httpOptions);
  }

  delete(dataItem: DataItemRequest) {
    this.http.delete(this.baseUrl + '/' + dataItem.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }

}
