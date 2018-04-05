import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  login: Login;

  constructor() { }

  ngOnInit() {
    this.login = new Login();
    this.login.email = 'testetetet';
  }

}
