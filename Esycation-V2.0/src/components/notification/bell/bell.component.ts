import { Component } from "@angular/core";
import { NavController } from "ionic-angular";


@Component({
  selector: "notification-bell",
  templateUrl: "./bell.html"
})
export class NotificationBellComponent {
   notificationCount : Number = 0;

  constructor(private navCtrl: NavController) {
    console.log("NotificationBellComponent === ");
    this.notificationCount = 0;
  }

  onNotification() {
    console.log("NotificationBellComponent === ");
    this.navCtrl.push("ViewAllNotificationComponent");
  }
}
