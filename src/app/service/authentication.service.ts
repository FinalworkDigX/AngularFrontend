import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../model/token';
import { Login } from '../model/login';
import { Observable } from 'rxjs/Observable';
import { SessionService } from './session.service';
import { isEmpty } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  @Output() loginState: EventEmitter<boolean> = new EventEmitter<boolean>();

  private baseUrl = '/api/v1/auth';
  private token_: Token;

  // Getter to only return private token (a la .net)
  get token(): Token {
    return this.token_;
  }

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private sessionService: SessionService
  ) {
    this.token_ = JSON.parse(localStorage.getItem('token'));
    if (this.token_) {
      this.sessionService.setAuthorizationHeader(this.getAuthorizationHeader());
    }
  }

  login(login: Login): Observable<String> {
    return new Observable<String>((observer) => {
      this.http.post<Token>(this.baseUrl + '/admin/login', login, this.sessionService.httpOptions)
        .subscribe((data) => {
            this.token_ = data;
            localStorage.setItem('token', JSON.stringify(data));
            this.sessionService.setAuthorizationHeader(this.getAuthorizationHeader());
          },
          (err) => {
            console.log('AuthService: \n\tauth error: \n\t\tstatus: %s\n\t\tmessage: %s', err.status, err.message);
            observer.error(err);
          },
          () => {
            console.log('AuthService: Login completed');
            observer.next(this.getAuthorizationHeader());
            this.fireEvent();
          });
    });
  }

  logout() {
    // Logout option to API
    this.http.post(this.baseUrl + '/logout', {}, this.sessionService.httpOptions)
      .subscribe(
        (res: any) => {},
        error => console.log(error)
      );
    // Logout in browser + locally
    localStorage.removeItem('token');
    this.token_ = null;
    this.fireEvent();
  }

  fireEvent() {
    this.loginState.emit(this.isAuthenticated());
  }

  getLoginState() {
    return this.loginState;
  }

  isAuthenticated(): boolean {
    if (this.token === null) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(this.token.access_token);
  }

  getAuthorizationHeader(): string {
    return 'Bearer ' + (this.isAuthenticated() ? this.token.access_token : '');
  }
}
