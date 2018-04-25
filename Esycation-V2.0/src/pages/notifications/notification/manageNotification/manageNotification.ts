import { Component } from "@angular/core";
import { IonicPage, Nav, Events } from "ionic-angular";
import { UserSessionService } from "../../../../providers/service/core/user.session.service";
import { NotificationService } from "../../../../providers/service/notification/notification.service";
import { NotificationDetails } from "../../../../providers/model/notification/notification.model";
import { CommonServices } from "../../../../providers/service/common/common.service";

@IonicPage()
@Component({
  selector: "manage-notification",
  templateUrl: "manageNotification.html"
})
export class ManageNotificationComponent {
  public notifications = new Array<NotificationDetails>();
  remoteId: number;
  module: string;
  shownDetail = null;
  dataNotFound: Boolean = false;
  constructor(
    private session: UserSessionService,
    private notificationService: NotificationService,
    private nav: Nav,
    private commonServices: CommonServices,
    private events: Events
  ) {
    this.remoteId = this.session.findRemote();
    this.module = this.session.findModule();
    this.findAllNotifications(this.remoteId, this.module);
  }

  findAllNotifications(remoteId: number, module: string) {
    this.commonServices.onLoader();
    this.notificationService
      .findAllByRemoteIdAndModule(remoteId, module)
      .subscribe(
        data => {
          for (let notification of data.contents) {
            let b = Object.assign({}, notification);
            b.styleColor = this.findColor(b.notificationId.type);
            b.typeInfo = this.findInfo(b.notificationId.type);
            this.notifications.push(b);
          }
          if (this.notifications.length == 0) {
            this.dataNotFound = true;
          } else {
            this.dataNotFound = false;
          }
          this.commonServices.onDismissAll();
        },
        error => {
          this.commonServices.onDismissAll();
          console.log(error);
        }
      );
  }

  onRead(id: number) {
    this.onView(id);
    this.notificationService.readMessage(id).subscribe(
      data => {
        console.log(data);
        for (let notification of this.notifications) {
          if (id == notification.id && notification.readStatus == "UNREAD") {
            notification.readStatus = "READ";
          }
        }
        this.events.publish("notification:updateCount");
      },
      error => {
        console.error(error);
      }
    );
  }

  toggleDetail(group) {
    if (this.isDetailShown(group)) {
      this.shownDetail = null;
    } else {
      this.shownDetail = group;
    }
  }
  isDetailShown(group) {
    return this.shownDetail === group;
  }

  onView(id: number) {
    this.nav.push("ViewNotificationComponent", { id: id });
  }

  findColor(type: any): string {
    if (type == "INFORMATIVE") return "#488aff";
    else if (type == "URGENT") return "#f53d3d";
    else if (type == "ACTIONABLE") return "#ffeb3b";
    else if (type == "HOMEWORK") return "#ff5722";
    else return "#9e9e9e";
  }

  findInfo(type: string): string {
    if (type == "INFORMATIVE") return "i";
    else if (type == "URGENT") return "U";
    else if (type == "ACTIONABLE") return "A";
    else if (type == "HOMEWORK") return "H";
    else return "?";
  }
}
