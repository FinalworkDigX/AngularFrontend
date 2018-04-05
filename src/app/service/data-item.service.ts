import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataItem } from '../model/data-item';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataItemService {

  private baseUrl = '/api/v1/dataItem';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.baseUrl, httpOptions);
  }

  create(dataItem: DataItem): Observable<DataItem> {
    return this.http.post<DataItem>(this.baseUrl, dataItem, httpOptions);
  }

  update(dataItem: DataItem): Observable<DataItem> {
    return this.http.put<DataItem>(this.baseUrl, dataItem, httpOptions);
  }

  delete(dataItem: DataItem) {
    this.http.delete(this.baseUrl + '/' + dataItem.id)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
