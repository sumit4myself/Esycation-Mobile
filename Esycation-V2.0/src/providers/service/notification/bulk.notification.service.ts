import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServerConfig } from "../../config";
import { CostumErrorHandler } from "../core/error.service";
import { Observable } from "rxjs/Rx";
import { BaseService } from "../core/base.service";
import { CommonServices } from "../common/common.service";
import { NotificationDetails } from "../../model/notification/notification.model";
import { UserSessionService } from "../../service/core/user.session.service";

@Injectable()
export class BulkNotificationService extends BaseService<NotificationDetails> {
  constructor(
    @Inject(Http) protected http: Http,
    @Inject(CostumErrorHandler) protected errorHandler: CostumErrorHandler,
    @Inject(UserSessionService)
    protected userSessionService: UserSessionService,
    @Inject(CommonServices) protected commonServices: CommonServices
  ) {
    super(http, errorHandler);
  }

  public findTemplateByMode(mode: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/templates/findByMode/NOTIFICATIONSERVICE?mode=" +
      mode +
      "&RESPONSE_VIEW=Template.NameId&page=1&size=100";
    return this.get(url);
  }

  public saveBulkNotification(data: any): Observable<any> {
    let url: string = ServerConfig.getPath() + "/bulkNotifications/";

    return this.post(url, data);
  }

  public updateBulkNotification(data: any): Observable<any> {
    let url: string = ServerConfig.getPath() + "/bulkNotifications/" + data.id;

    return this.put(url, data);
  }

  public findGroup(userId: number, viewName: string): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "/groups/findAssignedGroup/" +
      userId +
      "?RESPONSE_VIEW=" +
      viewName +
      "";
    return this.get(url);
  }

  public manage(page: number, size: number): Observable<any> {
    let data = { page: page, size: size };
    let url: string =
      ServerConfig.getPath() +
      "bulkNotifications/search?RESPONSE_VIEW=Notification.Summary";

    return this.search(url, data);
  }

  public findById(id: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "bulkNotifications/" +
      id +
      "?RESPONSE_VIEW=Notification.Summary";

    return this.get(url);
  }

  public findByNotificationId(
    id: number,
    module: string,
    page: number,
    size: number
  ): Observable<any> {
    let url: string =
      ServerConfig.getPath() +
      "notificationReceivers/findByNotificationId/" +
      id +
      "/" +
      module +
      "" +
      "?RESPONSE_VIEW=NotificationReceiver.MinDetails&page=" +
      page +
      "&size=" +
      size +
      "";

    return this.get(url);
  }

  public deleteBulkNotification(id: number): Observable<any> {
    let url: string = ServerConfig.getPath() + "/bulkNotifications/" + id;
    return this.delete(url);
  }

  public withSelections(id: number): Observable<any> {
    let url: string =
      ServerConfig.getPath() + "bulkNotifications/" + id + "/withSelections";
    return this.get(url);
  }
}
