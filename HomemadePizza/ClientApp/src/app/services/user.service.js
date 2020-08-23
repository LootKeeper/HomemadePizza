"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService = /** @class */ (function () {
    function UserService(_http, _loginService) {
        this._http = _http;
        this._loginService = _loginService;
    }
    UserService.prototype.userName = function () {
        return this._user ? this._user.name : '';
    };
    UserService.prototype.isLoggedIn = function () {
        return this._isLoggedIn;
    };
    UserService.prototype.getUserInfo = function () {
        var _this = this;
        this._loginService.checkLoginStatus().subscribe(function (user) {
            _this.setUser(user);
        }, function (error) {
            _this.setUser(null);
        });
    };
    UserService.prototype.setUser = function (user) {
        if (user) {
            this._user = user;
            this._isLoggedIn = true;
        }
        else {
            this._user = undefined;
            this._isLoggedIn = false;
        }
    };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.service.js.map