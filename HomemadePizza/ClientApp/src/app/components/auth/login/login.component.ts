import { Component, OnInit } from '@angular/core';
import UserService from '../../../services/user.service';
import LoginService from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: string;
  password: string;

  constructor(
    private _userService: UserService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  isValid(): boolean {
    return this.userName
      && this.userName.length > 0
      && this.password
      && this.password.length > 0;
  }

  login(): void {
    if (!this.isValid()) return;
    this._loginService.login({
      name: this.userName,
      password: this.password
    }).subscribe(user => {
      if (user) {
        this._userService._setUser(user);
        this._router.navigate(['/']);
      }
    })
  }

  handleNameChange(name) {
    this.userName = name;
  }

  handlePwdChange(pwd) {
    this.password = pwd;
  }
}
