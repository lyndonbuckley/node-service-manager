"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerManager = void 0;
var ServiceManager_1 = require("./ServiceManager");
var HTTPServer_1 = require("./HTTPServer");
var HealthCheck_1 = require("./HealthCheck");
var ServerManager = /** @class */ (function (_super) {
    __extends(ServerManager, _super);
    function ServerManager(callback) {
        var _this = _super.call(this) || this;
        _this._httpServer = [];
        _this._healthCheckEndpoints = [];
        _this._healthCheckUserAgents = [];
        _this.httpCallback = callback;
        return _this;
    }
    ServerManager.prototype.http = function (port, host) {
        if (host === void 0) { host = '0.0.0.0'; }
        var server = new HTTPServer_1.HTTPServer(this, { port: port, host: host });
        this._httpServer.push(server);
        return server;
    };
    ServerManager.prototype.socket = function (socket) {
        var server = new HTTPServer_1.HTTPServer(this, { socket: socket });
        this._httpServer.push(server);
        return server;
    };
    ServerManager.prototype.healthCheck = function (name, callback) {
        var healthCheck = new HealthCheck_1.HealthCheck(this, callback);
        this._healthChecks[name] = healthCheck;
        return healthCheck;
    };
    ServerManager.prototype._serverCallback = function (req, res) {
        var isHealthy = (this.status === ServiceManager_1.ServiceStatus.Healthy);
        if (!this.httpCallback)
            return this._healthCheckCallback(req, res, isHealthy);
        if (isHealthy)
            return this.httpCallback(req, res);
        else
            return this._unhealthyCallback(req, res);
    };
    ServerManager.prototype._unhealthyCallback = function (req, res) {
        res.writeHead(503);
        res.end('Service Unavailable');
    };
    ServerManager.prototype._healthCheckCallback = function (req, res, healthy) {
    };
    return ServerManager;
}(ServiceManager_1.ServiceManager));
exports.ServerManager = ServerManager;
//# sourceMappingURL=ServerManager.js.map