import { Component, OnInit } from "@angular/core";
import StoreService from "../../services/store.service";
import { Pizza } from "../../models/pizza";
import OrderService from "../../services/order.service";

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  isLoading = true;
  goods: Pizza[];

  constructor(private _storeService: StoreService, private _orderService: OrderService) {   
    
  }

  ngOnInit() {
    this._storeService.getGoods().subscribe((goods) => {
      if (goods) {
        this.isLoading = false;
        this.goods = goods;
      }
    })
  }

  addToCart(id: number) {
    const pizza = this.goods.find(item => item.id === id);
    if (pizza) {
      this._orderService.addToCart(pizza);
    }
  }
}
