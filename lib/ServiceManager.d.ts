export declare type ServiceCallback = () => Promise<void> | Promise<boolean> | boolean | void;
export declare enum ServiceStatus {
    Init = "init",
    Boot = "boot",
    Healthy = "healthy",
    Unhealthy = "unhealthy",
    Errored = "errored"
}
export interface ServiceCallbacks {
    beforeUp: ServiceCallback[];
    beforeDown: ServiceCallback[];
    afterUp: ServiceCallback[];
    afterDown: ServiceCallback[];
}
export declare class ServiceManager {
    _callbacks: {
        [type: string]: ServiceCallback[];
    };
    _status: ServiceStatus;
    get status(): ServiceStatus;
    constructor();
    addCallback(type: string, callback: ServiceCallback | ServiceCallback[]): void;
    beforeUp(callback: ServiceCallback | ServiceCallback[]): void;
    afterUp(callback: ServiceCallback | ServiceCallback[]): void;
    beforeDown(callback: ServiceCallback | ServiceCallback[]): void;
    afterDown(callback: ServiceCallback | ServiceCallback[]): void;
    boot(): void;
}
