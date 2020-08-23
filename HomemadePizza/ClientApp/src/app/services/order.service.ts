import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subscriber } from "rxjs";

import { Pizza } from "../models/pizza";
import { CartItem } from "../models/cartItem";

@Injectable({
  providedIn: 'root'
})
export default class OrderService {

  private orderLimit = 25;
  private _order: CartItem[] = [];

  constructor(private _http: HttpClient) {
  }

  addToCart(pizza: Pizza): boolean {
    const cartItem = this._order.find(cartItem => cartItem.item.id === pizza.id);
    if (this.getGoodsCount() < this.orderLimit) {
      if (cartItem) {
        cartItem.count++;
      } else {
        this._order.push({
          count: 1,
          item: pizza
        });
      }
      return true;
    } else {
      return false;
    }    
  }

  removeFromCart(pizza: Pizza): boolean {
    const cartItem = this._order.find(cartItem => cartItem.item.id === pizza.id);
    if (cartItem) {
      cartItem.count--;
      if (cartItem.count === 0) {
        this._order = this._order.filter(goods => goods.item !== cartItem.item);
      }
    }    
    return true;
  }

  getGoodsCount(): number {
    return this._order.map(item => item.count).reduce((prev, current) => prev + current, 0);
  }
}
