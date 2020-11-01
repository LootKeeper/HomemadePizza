import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import OrderService from '../services/order.service';
import UserService from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  goodsInCart: number;
  user: User;
  isLoggedIn: boolean;

  private _subscriptions: Subscription[] = [];

  get userName(): string {
    return this.user ? this.user.name : '';
  }

  constructor(
    private _orderService: OrderService,
    private _userService: UserService) {
  }

  ngOnInit() {
    this._subscribeToData();
  }

  _subscribeToData(): void {
    this._subscribeOnGoodsInCartCount();
    this._subscribeOnLoggedInStatus();
    this._subscribeOnUser();
  }

  ngOnDestroy() {
    this._unsubscribeFromData();
  }

  private _subscribeOnGoodsInCartCount() {
    const orderCountSubscription = this._orderService.getOrderCount().subscribe((count) => {
      this.goodsInCart = count;
    });
    this._subscriptions.push(orderCountSubscription);
  }

  private _subscribeOnLoggedInStatus() {
    const loginStatusSubscription = this._userService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
    this._subscriptions.push(loginStatusSubscription);
  }

  private _subscribeOnUser() {
    const userInfoSubscription = this._userService.user().subscribe((user) => {
      this.user = user;
    });
    this._subscriptions.push(userInfoSubscription);
  }

  private _unsubscribeFromData(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
