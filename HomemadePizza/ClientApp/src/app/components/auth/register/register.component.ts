import { Component, OnInit } from '@angular/core';
import UserService from '../../../services/user.service';
import LoginService from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userName: string;
  password: string;
  confirmPassword: string;

  constructor(
    private _userService: UserService,
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  isValid(): boolean {
    return this.userName && this.password && this.password === this.confirmPassword;
  }

  register(): void {
    this._loginService.register({
      name: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe((user) => {
      if (user) {
        this._userService.setUser(user);
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

  handleConfirmPwdChange(pwd) {
    this.confirmPassword = pwd;
  }

}
