import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit, OnDestroy } from "@angular/core";

import { User } from "../models/user";
import LoginService from "./login.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export default class UserService implements OnInit, OnDestroy {

  _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  private _user: Observable<User> = this._userSubject.asObservable();

  _loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isLoggedIn: Observable<boolean> = this._loggedInSubject.asObservable();

  private loginStatusSubscription: Subscription;

  constructor(
    private _http: HttpClient,
    private _loginService: LoginService) {
    this._user.subscribe((user) => {
      if (user) {
        this._loggedInSubject.next(true);
      } else {
        this._loggedInSubject.next(false);
      }
    })
  }

  ngOnInit() {
    this.loginStatusSubscription = this._getUserInfo().subscribe(
      (user) => {
        this._setUser(user);
      },
      (error) => {
        this._setUser(null);
      });
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }

  user(): Observable<User> {
    return this._user;
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn;
  }

  logout(): void {
    this._loginService.logout().subscribe(() => {
      this._setUser(null);
    }) 
  }
  
  private _getUserInfo(): Observable<User> {
    return this._loginService.checkLoginStatus();
  }

  _setUser(user: User): void {
    this._userSubject.next(user);
  }
}
