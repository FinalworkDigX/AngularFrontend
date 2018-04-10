import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private baseUrl =  '/api/v1/management/user';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.sessionService.httpOptions);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.sessionService.httpOptions);
  }

  update(user: User): Observable<User> {
    console.log('Not Yet Implemented (API SIDE)');
    return of(new User());
  }

  delete(user: User) {
    this.http.delete(this.baseUrl + '/' + user.user_id, this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
  }
}
