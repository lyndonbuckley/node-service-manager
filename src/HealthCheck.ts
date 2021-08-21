import {ServiceManager} from "./ServiceManager";

export type HealthCheckCallback = () => Promise<boolean>;
export class HealthCheck {

    healthy: boolean = false;
    constructor(serviceManager: ServiceManager, callback: HealthCheckCallback) {

    }
}
