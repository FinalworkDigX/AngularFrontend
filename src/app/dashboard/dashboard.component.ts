import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  login: Login;

  constructor(
    private webSocket: SocketService,
  ) { }

  ngOnInit() {
    this.handleDataLogs();
  }

  private handleDataLogs() {
    this.webSocket.dataLog.subscribe(dataLog => {
      console.log(dataLog);
    });
  }
}
