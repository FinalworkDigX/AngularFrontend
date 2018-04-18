import { Component, Input, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @Input() login: Login;
  answer: String;
  hide = true;

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
    this.createForm();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
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
