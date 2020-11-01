import { Component, Input, OnDestroy } from "@angular/core";
import { CartItem } from "../../models/cartItem";
import OrderService from "../../services/order.service";
import { Pizza } from "../../models/pizza";
import { Subscription } from "rxjs";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy {
  @Input() items: CartItem[];

  private _subscriptions: Subscription[] = [];

  constructor(private _orderService: OrderService) {
    const sub = this._orderService.getOrder().subscribe(items => this.items = items);
    this._subscriptions.push(sub);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  increase(id: number) {
    this._orderService.addToCartById(id);
  }

  decrease(id: number) {
    this._orderService.removeFromCartById(id);
  }
}
