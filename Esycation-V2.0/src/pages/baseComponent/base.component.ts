import { NavController } from "ionic-angular";
import { UserSessionService } from "../../providers/service/core/user.session.service";
//import {NotificationService} from '../../providers/service/notification/notification.service';

export abstract class BaseComponent {
  public notificationCount: String;

  constructor(
    protected service: UserSessionService,
    protected navCtrl: NavController
  ) {
    this.notificationCount = localStorage.getItem("notificationCount");
  }

  onNotification() {
    this.navCtrl.push("ManageNotificationComponent");
  }

  onMyRequest(module, processInstanceId, targetId, api, cancelable) {
    let myRequestDetails = {
      module: module,
      processInstanceId: processInstanceId,
      targetId: targetId,
      api: api,
      cancelable: cancelable
    };

    this.navCtrl.push("MyRequestComponent", {
      myRequestDetails: myRequestDetails
    });
  }
}
