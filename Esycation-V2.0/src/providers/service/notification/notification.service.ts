/* tslint:disable */
import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";
import { UserSessionService } from "../../service/core/user.session.service";
import { PagedResponse } from "../../model/common/PaggedResponse";
import { NotificationDetails } from "../../model/notification/notification.model";
import { CommonServices } from "../common/common.service";

@Injectable()
export class NotificationService extends BaseService<PagedResponse> {
  notifications: Array<NotificationDetails>;
  notificationDetails: NotificationDetails = new NotificationDetails();
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findAllByRemoteIdAndModule(
    remoteId: number,
    module: string
  ): Observable<PagedResponse> {
    let url: string =
      ServerConfig.getPath() +
      "/notificationReceivers/" +
      remoteId +
      "/" +
      module +
      "?mode=PUSH_MESSAGE&RESPONSE_VIEW=NotificationReceiver.Details";
    return this.get(url);
  }

  public countAllByRemoteIdAndModule(
    remoteId: number,
    module: string
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/notificationReceivers/" +
      remoteId +
      "/" +
      module +
      "/count?mode=PUSH_MESSAGE&readStatus=UNREAD";
    return this.get(url);
  }

  public findById(id: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/notificationReceivers/" +
      id +
      "/?RESPONSE_VIEW=NotificationReceiver.Details";
    return this.get(url);
  }

  public readMessage(id: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/notificationReceivers/" +
      id +
      "/changeStatus/?RESPONSE_VIEW=NotificationReceiver.Details&status=READ";
    return this.patch(url);
  }
}
