import { Component, OnInit, OnDestroy } from "@angular/core";
import StoreService from "../../services/store.service";
import { Pizza } from "../../models/pizza";
import OrderService from "../../services/order.service";
import UserService from "../../services/user.service";;
import { Subscription } from "rxjs";
import { User } from "../../models/user";

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {

  isLoading = true;
  goods: Pizza[];

  private _subscriptions: Subscription[] = [];

  constructor(
    private _storeService: StoreService,
    private _orderService: OrderService,
    private _userService: UserService) {    
  }

  ngOnInit() {
    this._subscribeToData();
  }

  _subscribeToData(): void {
    this._subscribeOnGoods();
  }

  ngOnDestroy() {
    this._unsubscribeFromData();
  }

  private _unsubscribeFromData(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _subscribeOnGoods() {
    const goodsSubscription = this._storeService.getGoods().subscribe((goods) => {
      if (goods) {
        this.isLoading = false;
        this.goods = goods;
      }
    });
    this._subscriptions.push(goodsSubscription);
  }  

  addToCart(id: number) {
    const pizza = this.goods.find(item => item.id === id);
    if (pizza) {
      this._orderService.addToCart(pizza);
    }
  }
}
