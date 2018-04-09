import { Component, Input, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login: Login;
  answer: String;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.login = new Login();
    if (authenticationService.token) {
      this.router.navigate(['/dashboard']).then();
    }
  }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.login).subscribe((message) => {
      console.log(message);
      this.answer = message;
      // .then to remove intelij error message
      this.router.navigate(['/dashboard']).then();
    },
    (err) => {
      //
    });
  }

}
