import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFrontend';
  loggedIn: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.authenticationService.getLoginState().subscribe(loggedIn => this.loggedIn = loggedIn);
    this.loggedIn = this.authenticationService.isAuthenticated();
  }

  onLogout() {
   this.authenticationService.logout();
   this.router.navigate(['/login']).then();
  }

}
