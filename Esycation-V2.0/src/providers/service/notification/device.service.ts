/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Device } from '../../model/notification/device.model';
import { BaseService } from '../core/base.service';
import { Events } from 'ionic-angular';

@Injectable()
export class DeviceService extends BaseService<Device> {

    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
        @Inject(Events) private events: Events
    ) {
        super(http, errorHandler);



    }

    public initSubscribers(): void {
        this.events.subscribe("user:loggedin", (object) => {
            this.register(object);
            console.log("user:loggedin", JSON.stringify(object));
        });

        this.events.subscribe("user:loggedOut", (object) => {
            this.deRegister(object);
            console.log("user:loggedOut", JSON.stringify(object));
        });
    }

    public register(object: any): void {
        let device = new Device();
        device.receiverId = object.remoteId;
        device.receiverType = object.module;
        device.registrationId = object.registrationId;
        let url: string = ServerConfig.getPath() + "/devices";
        this.save(url, device).subscribe(data => {
            this.events.publish("device:registered", data);
        });
    }

    public deRegister(object: any): void {
        let device = new Device();
        device.receiverId = object.remoteId;
        device.receiverType = object.module;
        device.registrationId = object.registrationId;
        let url: string = ServerConfig.getPath() + "/devices";
        this.delete(url, device).subscribe(data => {
            this.events.publish("device:deregistered", data);
        });
    }

}
