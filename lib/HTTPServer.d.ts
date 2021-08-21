/// <reference types="node" />
import { Server } from "http";
import { ServerManager } from "./ServerManager";
export interface HTTPServerOptions {
    port?: number;
    host?: string;
    socket?: string;
}
export declare class HTTPServer {
    manager: ServerManager;
    port?: number;
    host?: string;
    socket?: string;
    server: Server;
    constructor(manager: ServerManager, options: HTTPServerOptions);
    private _serverCallback;
    startListener(): void;
}
