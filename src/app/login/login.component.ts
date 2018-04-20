import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Login } from '../model/login';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  @Input() login: Login;
  answer: String;
  hide = true;
  errorMessage: String;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.login = new Login();
    if (authenticationService.token) {
      this.router.navigate(['/dashboard']).then();
    }

    this.renderer.addClass(document.body, 'login-wrapper');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-wrapper');
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
      console.log(err.error.message);
      this.errorMessage = err.error.message;
    });
  }

}
