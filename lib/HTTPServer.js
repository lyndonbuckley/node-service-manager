"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPServer = void 0;
var http_1 = require("http");
var ServiceManager_1 = require("./ServiceManager");
var HTTPServer = /** @class */ (function () {
    function HTTPServer(manager, options) {
        this.manager = manager;
        this.server = http_1.createServer(manager._serverCallback.bind(manager));
        if (options.port)
            this.port = options.port;
        if (options.host)
            this.host = options.host;
        if (options.socket)
            this.socket = options.socket;
    }
    HTTPServer.prototype._serverCallback = function (req, res) {
        if (this.manager.status === ServiceManager_1.ServiceStatus.Healthy && this.manager.httpCallback)
            return this.manager.httpCallback(req, res);
    };
    HTTPServer.prototype.startListener = function () {
    };
    return HTTPServer;
}());
exports.HTTPServer = HTTPServer;
//# sourceMappingURL=HTTPServer.js.map