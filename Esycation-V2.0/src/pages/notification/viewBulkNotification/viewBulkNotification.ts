import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserSessionService } from '../../../providers/service/core/user.session.service';
import { BulkNotificationService } from '../../../providers/service/notification/bulk.notification.service';
import { BaseComponent } from '../../baseComponent/base.component';
import { ServerConfig } from '../../../providers/config';
import { NotificationReciever } from '../../../providers/model/notification/notification.reciever.model';


@IonicPage()
@Component({
  selector: 'view-bulk-notification-p',
  templateUrl: 'viewBulkNotification.html'
})
export class ViewBulkNotificationsComponent extends BaseComponent {

  imagePath: String = ServerConfig.imagePath();
  staffs: Array<NotificationReciever> = new Array<NotificationReciever>();
  studentGuardians: Array<NotificationReciever> = new Array<NotificationReciever>();
  viewMode: string;
  staffDetailsNotFound: string = null;
  studentDetailsNotFound: string = null;
  page: number = 1;
  size: number = 200;
  
  constructor(private session: UserSessionService,
    private bulkNotificationService: BulkNotificationService,
    protected navControl: NavController,
    private navParams: NavParams) {

    super(session, navControl)
    this.viewMode = "first";
    console.log(this.session, this.bulkNotificationService);
  }

  ionViewDidLoad() {

    let notificationId =this.navParams.get("id");
    this.bulkNotificationService.findByNotificationId(notificationId, "STAFF", this.page, this.size).subscribe(data => {

      if (data.contents.length == 0) {
        this.staffDetailsNotFound = "Data not found.";
      } else {
        for (let d of data.contents) {
          let s = Object.assign({}, d);
          this.staffs.push(s);
        }
      }
    }, error => {
      console.log(error);
    })


    this.bulkNotificationService.findByNotificationId(notificationId, "GUARDIAN", this.page, this.size).subscribe(data => {

      if (data.contents.length == 0) {
        this.studentDetailsNotFound = "Data not found.";
      } else {
        for (let d of data.contents) {
          let s = Object.assign({}, d);
          this.studentGuardians.push(s);
        }
      }
    }, error => {
      console.log(error);
    })


  }


}
