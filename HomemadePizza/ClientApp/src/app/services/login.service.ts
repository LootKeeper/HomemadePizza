import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

import { User } from "../models/user";
import { registerModel } from "../models/registerModel";
import { loginModel } from "../models/loginModel";

@Injectable({
  providedIn: 'root'
})
export default class LoginService {

  constructor(
    private _http: HttpClient,
    @Inject('BASE_URL') private _baseUrl: string) {    
  }

  checkLoginStatus(): Observable<User> {
    return this._http.get<User>(this._baseUrl + 'api/getUserInfo');
  }

  login(model: loginModel): Observable<User> {
    const headers = this._getJsonHeaders();
    return this._http.post<User>(this._baseUrl + 'api/login', model, { headers });
  }

  register(model: registerModel): Observable<User> {
    const headers = this._getJsonHeaders();
    return this._http.post<User>(this._baseUrl + 'api/register', model, { headers });
  }

  logout(): Observable<void> {
    return this._http.get<void>(this._baseUrl + 'api/logout');
  }

  private _getJsonHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers.append('Content-Type', 'application/json');
  }
}
