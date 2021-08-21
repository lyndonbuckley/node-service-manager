/// <reference types="node" />
import { ServiceManager } from "./ServiceManager";
import { IncomingMessage, ServerResponse } from "http";
import { HTTPServer } from "./HTTPServer";
import { HealthCheck, HealthCheckCallback } from "./HealthCheck";
export declare type HTTPCallback = (req: IncomingMessage, res: ServerResponse) => void;
export declare class ServerManager extends ServiceManager {
    httpCallback?: HTTPCallback;
    _httpServer: any[];
    _healthChecks: {
        [name: string]: HealthCheck;
    };
    _healthCheckEndpoints: string[];
    _healthCheckUserAgents: string[];
    http(port: number, host?: string): HTTPServer;
    socket(socket: string): HTTPServer;
    healthCheck(name: string, callback: HealthCheckCallback): HealthCheck;
    _serverCallback(req: IncomingMessage, res: ServerResponse): void;
    _unhealthyCallback(req: IncomingMessage, res: ServerResponse): void;
    _healthCheckCallback(req: IncomingMessage, res: ServerResponse, healthy: any): void;
    constructor(callback?: HTTPCallback);
}
