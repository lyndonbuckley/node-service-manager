import {createServer, IncomingMessage, Server, ServerResponse} from "http";
import {ServerManager} from "./ServerManager";
import {ServiceStatus} from "./ServiceManager";

export interface HTTPServerOptions {
    port?: number;
    host?: string;
    socket?: string;
}
export class HTTPServer {

    manager: ServerManager;
    port?: number;
    host?: string;
    socket?: string;
    server: Server;

    constructor(manager: ServerManager, options: HTTPServerOptions) {
        this.manager = manager;
        this.server = createServer(manager._serverCallback.bind(manager));
        if (options.port)
            this.port = options.port;
        if (options.host)
            this.host = options.host;
        if (options.socket)
            this.socket = options.socket;
    }

    private _serverCallback(req: IncomingMessage, res: ServerResponse) {
        if (this.manager.status === ServiceStatus.Healthy && this.manager.httpCallback)
            return this.manager.httpCallback(req, res);
    }

    startListener() {

    }
}
