import { Injectable } from "@angular/core";
import { Currency } from "../models/currency";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private currencyRate: Map<Currency, number> = new Map<Currency, number>();

  private defaultCurrency: Currency = Currency.USD;
  private currentCurrency: Currency;

  constructor() {
    this.currentCurrency = this.defaultCurrency;
    this.currencyRate.set(Currency.USD, 1);
    this.currencyRate.set(Currency.EUR, 0.8);
  }

  getCurrency(): Currency {
    return this.currentCurrency;
  }

  setCurrency(currency: Currency): void {
    this.currentCurrency = currency;
  }

  getValue(price: number): number {
    const rate = this.currencyRate.get(this.currentCurrency);
    return Math.round(price * rate);
  }
}
