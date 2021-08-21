"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = exports.ServiceStatus = void 0;
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["Init"] = "init";
    ServiceStatus["Boot"] = "boot";
    ServiceStatus["Healthy"] = "healthy";
    ServiceStatus["Unhealthy"] = "unhealthy";
    ServiceStatus["Errored"] = "errored";
})(ServiceStatus = exports.ServiceStatus || (exports.ServiceStatus = {}));
var ServiceManager = /** @class */ (function () {
    function ServiceManager() {
        this._status = ServiceStatus.Init;
        this._callbacks = {
            beforeUp: [],
            afterUp: [],
            beforeDown: [],
            afterDown: []
        };
    }
    Object.defineProperty(ServiceManager.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    ServiceManager.prototype.addCallback = function (type, callback) {
        if (!this._callbacks[type]) {
            this._callbacks[type] = [];
        }
        if (Array.isArray(callback)) {
            for (var _i = 0, callback_1 = callback; _i < callback_1.length; _i++) {
                var cb = callback_1[_i];
                this._callbacks[type].push(cb);
            }
        }
        else {
            this._callbacks[type].push(callback);
        }
    };
    ServiceManager.prototype.beforeUp = function (callback) {
        this.addCallback('beforeUp', callback);
    };
    ServiceManager.prototype.afterUp = function (callback) {
        this.addCallback('afterUp', callback);
    };
    ServiceManager.prototype.beforeDown = function (callback) {
        this.addCallback('beforeDown', callback);
    };
    ServiceManager.prototype.afterDown = function (callback) {
        this.addCallback('afterDown', callback);
    };
    ServiceManager.prototype.boot = function () {
    };
    return ServiceManager;
}());
exports.ServiceManager = ServiceManager;
//# sourceMappingURL=ServiceManager.js.map