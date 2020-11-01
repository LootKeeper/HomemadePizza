import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, BehaviorSubject, Subscription } from "rxjs";

import { Pizza } from "src/app/models/pizza";
import { CartItem } from "src/app/models/cartItem";
import StoreService from "./store.service";

@Injectable({
  providedIn: 'root'
})
export default class OrderService implements OnDestroy {

  private orderLimit = 25;

  private _orderSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  private _order$: Observable<CartItem[]> = this._orderSubject.asObservable();

  private _orderCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private _orderCount$: Observable<number> = this._orderCountSubject.asObservable();

  private _subscriptions: Subscription[] = [];

  private _goods: Pizza[] = [];

  constructor(private _http: HttpClient, private _storeService: StoreService) {
    const orderSubscription = this._order$.subscribe(order => {
      const count = order.map(item => item.count).reduce((prev, current) => prev + current, 0);
      this._orderCountSubject.next(count);
    })

    const goodsSubscription = this._storeService.getGoods().subscribe((goods) => {
      this._goods = goods;
    });

    this._subscriptions.push(orderSubscription, goodsSubscription);    
  }

  getOrder(): Observable<CartItem[]> {
    return this._order$;
  }

  getOrderCount(): Observable<number> {
    return this._orderCount$;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private _getPizzaById(id: number): Pizza {
    return this._goods.find(p => p.id === id);
  }

  addToCartById(id: number): boolean {
    const pizza = this._getPizzaById(id);
    if (pizza) {
      return this.addToCart(pizza);
    }
    return false;
  }

  removeFromCartById(id: number): boolean {
    const pizza = this._getPizzaById(id);
    if (pizza) {
      return this.removeFromCart(pizza);
    }
    return false;
  }

  addToCart(pizza: Pizza): boolean {
    const order = this._orderSubject.getValue();
    const cartItem = order.find(cartItem => cartItem.item.id === pizza.id);
    if (this._orderCountSubject.value < this.orderLimit) {
      if (cartItem) {
        cartItem.count++;
      } else {
        order.push({
          count: 1,
          item: pizza
        });
      }
      this._orderSubject.next(order);
      return true;
    } else {
      return false;
    }    
  }

  removeFromCart(pizza: Pizza): boolean {
    let order = this._orderSubject.getValue();
    const cartItem = order.find(cartItem => cartItem.item.id === pizza.id);
    if (cartItem) {
      cartItem.count--;
      if (cartItem.count === 0) {
        order = order.filter(goods => goods.item !== cartItem.item);
      }
      this._orderSubject.next(order);
    }    
    return true;
  }
}
