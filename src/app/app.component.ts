import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';
import { SocketService } from './service/socket.service';
import { DataItemRequestService } from './service/data-item-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularFrontend';
  loggedIn: boolean;
  pendingRequests: number;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private webSocket: SocketService,
    private dataItemRequestService: DataItemRequestService,
  ) {
    this.authenticationService.getLoginState().subscribe(loggedIn => this.loggedIn = loggedIn);
    this.loggedIn = this.authenticationService.isAuthenticated();
  }

  ngOnInit() {
    this.handleRequestNotifications();
  }

  onLogout() {
   this.authenticationService.logout();
   this.router.navigate(['/login']).then();
  }

  private handleRequestNotifications() {
    this.dataItemRequestService.getAll().subscribe(val => {
      if (val.length > 0) {
        this.pendingRequests = val.length;
      } else {
        this.pendingRequests = null;
      }
    });
    this.webSocket.requestNotification.subscribe(requestCount => {
      if (requestCount > 0) {
        this.pendingRequests = requestCount;
      } else {
        this.pendingRequests = null;
      }
    });
  }
}
