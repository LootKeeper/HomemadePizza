import { Component, Input } from '@angular/core';

import { PriceService } from 'src/app/services/price.service';
import UserService from 'src/app/services/user.service';

import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  @Input() userName: string;
  @Input() goodsCount: number;
  @Input() isUserLoggedIn: boolean;

  constructor(
    private _priceService: PriceService,
    private _userService: UserService) {
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
    this._userService.logout();  
  }
}
