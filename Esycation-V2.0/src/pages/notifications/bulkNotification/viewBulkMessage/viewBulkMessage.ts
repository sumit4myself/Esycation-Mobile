import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';
import { BulkNotificationView } from '../../../../providers/model/notification/bulk.notification.view.model';

@IonicPage()
@Component({
  selector: 'view-bulk-message',
  templateUrl: 'viewBulkMessage.html'
})
export class ViewBulkMessageComponent {

  notification: BulkNotificationView = new BulkNotificationView();
  message: string = null;
  constructor(private service: BulkNotificationService,
    private navParams: NavParams) {

  }

  ionViewDidLoad() {
    let id = this.navParams.get("id");

    /*
    this.service.findById(id).subscribe(data => {
      this.notification = Object.assign({}, data);
      this.message = this.notification.receivers[0].message;

    }, error => {
      console.error(error);
    })
    */

    this.service.withSelections(id).subscribe(data => {
      this.notification = Object.assign({},data);
      this.notification.iconTitle = this.findFirstLatter(this.notification.template.mode);
      this.notification.iconColor = this.findColor(this.notification.template.mode);

    }, error => {
        console.error(error);
    })

  }

  findColor(title: string): string {

    let type = title.substring(0, 1);
    if (type == 'S')
      return "#EA1E63";
    else if (type == 'O')
      return "#0059B2";
    else if (type == 'E')
      return "#8dc34b";
    else if (type == 'P')
      return "#ff9800";
    else
      return "#9e9e9e";
  }

  findFirstLatter(title: string): string {

    return title.substring(0, 1);
  }

}
