/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ServerConfig } from '../../config';
import { CostumErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/base.service';
import { UserSessionService } from '../../service/core/user.session.service'
import { PagedResponse } from '../../model/common/PaggedResponse';
import { NotificationDetails } from '../../model/notification/notification.model';
import { CommonServices } from '../common/common.service';
import { Events } from 'ionic-angular';

@Injectable()
export class NotificationService extends BaseService<PagedResponse> {

    notifications: Array<NotificationDetails>;
    notificationDetails: NotificationDetails = new NotificationDetails();
    constructor( @Inject(Http) protected http: Http,
        @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
        @Inject(UserSessionService) protected userSessionService: UserSessionService,
        @Inject(CommonServices) protected commonServices: CommonServices,
        @Inject(Events) private events:Events
        //  protected push:Push
    ) {
        super(http, errorHandler);

        /*
        this.events.subscribe("notification:updateCount", (registrationId)=>{
            console.log("REGISTER_DEVICE..!",JSON.stringify(registrationId));           
        });

        */
    }

    public findAllByRemoteIdAndModule(remoteId: number, module: string): Observable<PagedResponse> {

        this.notifications = new Array<NotificationDetails>();
        let url: string = ServerConfig.getPath() +
            "/notifications/receivers/" + module + "/" + remoteId + "?mode=PUSH_MESSAGE&RESPONSE_VIEW=NotificationReceiver.Details";
        return this.findAll(url);
    }

    public countAllByRemoteIdAndModule(remoteId: number, module: string): void {
        let url: string = ServerConfig.getPath() +
            "/notifications/receivers/" + module + "/" + remoteId + "/count?mode=PUSH_MESSAGE&readStatus=UNREAD";
         this.find(url).subscribe(count=>{
            this.events.publish("notification:updateCount", count);
         });
    }


    public findById(id: number): Observable<any> {

        let url: string = ServerConfig.getPath() +
            "/notifications/receivers/" + id + "/?RESPONSE_VIEW=NotificationReceiver.Details";
        return this.find(url, id);
    }

    public readMessage(id: number): Observable<any> {

        let url: string = ServerConfig.getPath() +
            "/notifications/receivers/" + id + "/changeStatus/?RESPONSE_VIEW=NotificationReceiver.Details&status=READ";

        return this.changeStatus(url);
    }

   
}
