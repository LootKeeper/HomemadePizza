import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { User } from "../models/user";
import LoginService from "./login.service";

@Injectable({
  providedIn: 'root'
})
export default class UserService {

  private _user: User;
  private _isLoggedIn: boolean;

  constructor(
    private _http: HttpClient,
    private _loginService: LoginService) {
  }

  userName(): string {
    return this._user ? this._user.name : '';
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  
  getUserInfo(): void {
    this._loginService.checkLoginStatus().subscribe(
      (user) => {
        this.setUser(user);
    },
      (error) => {
        this.setUser(null);
    })
  }

  setUser(user: User): void {
    if (user) {
      this._user = user;
      this._isLoggedIn = true;
    } else {
      this._user = undefined;
      this._isLoggedIn = false;
    }
  }
}
