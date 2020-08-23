import { Component, OnInit } from '@angular/core';

import OrderService from '../../services/order.service';
import { PriceService } from '../../services/price.service';
import { Currency } from '../../models/currency';
import UserService from '../../services/user.service';
import LoginService from '../../services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _priceService: PriceService,
    private _userService: UserService,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this._userService.getUserInfo();
  }

  isUserLoggedIn(): boolean {
    return this._userService.isLoggedIn();
  }

  getUserName(): string {
    return this._userService.userName();
  }

  getGoodsInCartCount(): number {
    return this._orderService.getGoodsCount();
  }

  getCurrency(): Currency {
    return this._priceService.getCurrency();
  }

  selectUsd(): void {    
    this.setCurrency(Currency.USD);
  }

  selectEur(): void {
    this.setCurrency(Currency.EUR);
  }

  setCurrency(currency: Currency): void {
    const currentCurrency = this._priceService.getCurrency();
    if (currentCurrency !== currency) {
      this._priceService.setCurrency(currency);
    }
  }

  logout(): void {
    this._loginService.logout().subscribe(() => {
      this._userService.setUser(null);
    })    
  }
}
