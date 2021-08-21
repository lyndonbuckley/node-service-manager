export type ServiceCallback = () => Promise<boolean>;

export enum ServiceStatus {
    Init = "init",
    Boot = "boot",
    Healthy = "healthy",
    Unhealthy = "unhealthy",
    Errored = "errored"
}

export interface ServiceCallbacks {
    beforeUp: ServiceCallback[],
    beforeDown: ServiceCallback[],
    afterUp: ServiceCallback[],
    afterDown: ServiceCallback[]
}

export class ServiceManager {

    _callbacks: {[type: string]: ServiceCallback[]}
    _status: ServiceStatus;

    get status(): ServiceStatus {
        return this._status;
    }

    constructor() {
        this._status = ServiceStatus.Init;
        this._callbacks = {
            beforeUp:[],
            afterUp:[],
            beforeDown:[],
            afterDown:[]
        }
    }

    addCallback(type: string, callback: ServiceCallback | ServiceCallback[]) {
        if (!this._callbacks[type]) {
            this._callbacks[type] = [];
        }

        if (Array.isArray(callback)) {
            for (const cb of callback) {
                this._callbacks[type].push(cb);
            }
        } else {
            this._callbacks[type].push(callback);
        }
    }

    beforeUp(callback: ServiceCallback | ServiceCallback[]) {
        this.addCallback('beforeUp', callback);
    }
    afterUp(callback: ServiceCallback | ServiceCallback[]) {
        this.addCallback('afterUp', callback);
    }
    beforeDown(callback: ServiceCallback | ServiceCallback[]) {
        this.addCallback('beforeDown', callback);
    }
    afterDown(callback: ServiceCallback | ServiceCallback[]) {
        this.addCallback('afterDown', callback);
    }

    boot() {

    }
}
