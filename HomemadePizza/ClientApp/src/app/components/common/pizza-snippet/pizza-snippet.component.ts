import { Component, Input } from "@angular/core";
import { Pizza } from "../../../models/pizza";
import OrderService from "../../../services/order.service";
import { PriceService } from "../../../services/price.service";

@Component({
  selector: 'snippet',
  templateUrl: './pizza-snippet.component.html',
  styleUrls: ['./pizza-snippet.component.css']
})
export class PizzaSnippetComponent {
  @Input() pizza: Pizza;

  constructor(private orderService: OrderService, private priceService: PriceService) {
  }

  get price(): number {
    return this.priceService.getValue(this.pizza.price);
  }

  get currencyName(): string {
    return this.priceService.getCurrency();
  }

  addToCard() {
    if (this.pizza) {
      this.orderService.addToCart(this.pizza);
    }
  }
}
