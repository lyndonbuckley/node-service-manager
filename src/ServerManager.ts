import {ServiceCallback, ServiceManager, ServiceStatus} from "./ServiceManager";
import {IncomingMessage, ServerResponse} from "http";
import {HTTPServer} from "./HTTPServer";
import {HealthCheck, HealthCheckCallback} from "./HealthCheck";

//const server = http.createServer(app.callback());
// server.listen(8080, '0.0.0.0',() => {
//     const address = server.address();
//     console.log('Listening', address);
// });


export type HTTPCallback = (req: IncomingMessage, res: ServerResponse) => void;
export class ServerManager extends ServiceManager {

    httpCallback?: HTTPCallback;

    _httpServer: any[] = [];
    _healthChecks: {[name:string]: HealthCheck};
    _healthCheckEndpoints: string[] = [];
    _healthCheckUserAgents: string[] = [];

    http(port: number, host: string = '0.0.0.0') {
        const server = new HTTPServer(this, {port, host});
        this._httpServer.push(server);
        return server;
    }

    socket(socket: string) {
        const server = new HTTPServer(this, {socket});
        this._httpServer.push(server);
        return server;
    }

    healthCheck(name: string, callback: HealthCheckCallback) {
        const healthCheck = new HealthCheck(this, callback)
        this._healthChecks[name] = healthCheck
        return healthCheck;
    }

    _serverCallback(req: IncomingMessage, res: ServerResponse) {
        const isHealthy = (this.status === ServiceStatus.Healthy);
        if (!this.httpCallback)
            return this._healthCheckCallback(req, res, isHealthy);

        if  (isHealthy)
            return this.httpCallback(req, res);
        else
            return this._unhealthyCallback(req, res);
    }

    _unhealthyCallback(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(503);
        res.end('Service Unavailable');
    }

    _healthCheckCallback(req: IncomingMessage, res: ServerResponse, healthy) {

    }

    constructor(callback?: HTTPCallback) {
        super();
        this.httpCallback = callback;
    }

}
