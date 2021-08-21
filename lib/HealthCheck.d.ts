import { ServiceManager } from "./ServiceManager";
export declare type HealthCheckCallback = () => Promise<boolean> | boolean;
export declare class HealthCheck {
    healthy: boolean;
    constructor(serviceManager: ServiceManager, callback: HealthCheckCallback);
}
