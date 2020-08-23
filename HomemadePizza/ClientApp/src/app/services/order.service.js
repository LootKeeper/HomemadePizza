"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var OrderService = /** @class */ (function () {
    function OrderService(_http) {
        var _this = this;
        this._http = _http;
        this._goodsInCart = new rxjs_1.Observable(function (observer) {
            _this._goodsInCartObserver = observer;
            observer.next([]);
        });
    }
    OrderService.prototype.cartInfo = function () {
        return this._goodsInCart;
    };
    OrderService.prototype.addToCart = function (goods) {
        this._order.push(goods);
        this._goodsInCartObserver.next(this._order);
        return true;
    };
    OrderService.prototype.removeFromCart = function (goodsToRemove) {
        this._order = this._order.filter(function (goods) { return goods !== goodsToRemove; });
        this._goodsInCartObserver.next(this._order);
        return true;
    };
    return OrderService;
}());
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map