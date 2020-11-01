import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../../models/cartItem';

@Component({
  selector: 'cart-item-snippet',
  templateUrl: './cart-item-snippet.component.html',
  styleUrls: ['./cart-item-snippet.component.css']
})
export class CartItemSnippetComponent {

  @Input() item: CartItem;
  @Output() incHandler = new EventEmitter<number>();
  @Output() decrHandler = new EventEmitter<number>();

  get label(): string {
    return this.item ? this.item.item.label : '';
  }

  get count(): number {
    return this.item ? this.item.count : 0;
  }

  private _getItemId(): number | null {
    return this.item ? this.item.item.id : null;
  }

  handleInc() {
    const id = this._getItemId();
    if (this.incHandler && id) {
      this.incHandler.emit(id);
    }
  }

  handleDecr() {
    const id = this._getItemId();
    if (this.decrHandler && id) {
      this.decrHandler.emit(id);
    }
  }
}
