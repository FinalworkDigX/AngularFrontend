import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user';
import { UserDto } from '../dto/userDto';

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

  update(userDto: UserDto): Observable<User> {
    return this.http.put<User>(this.baseUrl, userDto, this.sessionService.httpOptions);
  }

  delete(user: User) {
    const httpOptions = this.sessionService.httpOptions;
    httpOptions['body'] = user;

    this.http.request('delete', this.baseUrl, httpOptions)
      .subscribe(
      (res: any) => {},
      error => console.log(error)
    );
  }

  resetConnection() {
    this.http.get('/api/v1/debug/workaround/mgmt', this.sessionService.httpOptions);
  }
}
