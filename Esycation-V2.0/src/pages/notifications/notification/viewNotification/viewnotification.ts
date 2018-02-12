import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NotificationService } from '../../../../providers/service/notification/notification.service';
import { NotificationDetails } from '../../../../providers/model/notification/notification.model';
import { CommonServices } from '../../../../providers/service/common/common.service';
import { NotificationUtils } from '../../../../providers/utilits/notificationUtils';
import { ServerConfig } from "../../../../providers/config";

@IonicPage()
@Component({
  selector: 'view-notifications',
  templateUrl: 'viewnotification.html'
})
export class ViewNotificationComponent {

  notification: NotificationDetails = new NotificationDetails();
  isLoaded: boolean = false;
  notificationCount: any = 0;
  files:Array<any>=new Array<any>();
  imagePath: String = ServerConfig.imagePath();
  constructor(private notificationService: NotificationService,
    private navParams: NavParams,
    private commonServices: CommonServices) {
  }


  ionViewDidLoad() {
    this.commonServices.onLoader();
    let id = this.navParams.get("id")
    id = 4021;
    this.notificationService.findById(id).subscribe(data => {
      let b = Object.assign({}, data);
      this.notification = b;
      this.notification.notificationId.styleColor = NotificationUtils.findColor(this.notification.notificationId.type);
      this.notification.notificationId.typeInfo = NotificationUtils.findFirstLatter(this.notification.notificationId.type);
      this.isLoaded = true;
      this.files.push(this.notification.notificationId.resources);
     
      this.commonServices.onDismissAll();
    }, error => {
      this.commonServices.onDismissAll();
      console.log(error);
    });
  }

}
