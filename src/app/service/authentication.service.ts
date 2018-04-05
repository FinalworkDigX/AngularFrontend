import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../model/token';
import { Login } from '../model/login';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
    private jwtHelperService: JwtHelperService
  ) {
    this.token_ = JSON.parse(localStorage.getItem('token'));
  }

  login(login: Login): Observable<String> {
    return new Observable<String>((observer) => {
      this.http.post<Token>(this.baseUrl + '/login', login, httpOptions)
        .subscribe((data) => {
            this.token_ = data;
            localStorage.setItem('token', JSON.stringify(data));
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
    // add logout option to API
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

  getAuthorizationHeader(): String {
    return 'Bearer ' + this.isAuthenticated() ? this.token.access_token : '';
  }
}
