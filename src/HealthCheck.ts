import {ServiceManager} from "./ServiceManager";

export type HealthCheckCallback = () => Promise<boolean> | boolean;
export class HealthCheck {

    healthy: boolean = false;
    constructor(serviceManager: ServiceManager, callback: HealthCheckCallback) {

    }
}
