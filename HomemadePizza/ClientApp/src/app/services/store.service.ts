import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Pizza } from "../models/pizza";

@Injectable({
  providedIn: 'root'
})
export default class StoreService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {
  }

  getGoods(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this._baseUrl + 'api/store');
  }
}
