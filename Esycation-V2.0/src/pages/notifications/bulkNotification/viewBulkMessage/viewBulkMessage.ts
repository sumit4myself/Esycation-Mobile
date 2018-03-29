import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';
import { BulkNotificationView } from '../../../../providers/model/notification/bulk.notification.view.model';
import { Observable } from "rxjs/Rx";
import { ServerConfig } from '../../../../providers/config';

@IonicPage()
@Component({
  selector: 'view-bulk-message',
  templateUrl: 'viewBulkMessage.html'
})
export class ViewBulkMessageComponent {

  notification: BulkNotificationView = new BulkNotificationView();
  comMode: any = null;
  attachedFiles: Array<any> = null;
  imagePath: String = ServerConfig.imagePath();
  //Receiver type STAFF
  staffSegment: string = "departmentSelection";

  //Receiver type STUDENT
  studentSegment: string = "studentSelection";

  //Receiver type GROUP
  groupSegment: string = "groupSelection";

  dataObservable: Observable<any>;

  constructor(private service: BulkNotificationService,
    private navParams: NavParams,
    private navControl: NavController) {
    this.staffSegment = 'departmentSelection';
    this.studentSegment = 'studentSelection';
    this.groupSegment = 'groupSelection';

    this.attachedFiles = new Array<number>();
  }

  ionViewDidLoad() {
    let id = this.navParams.get("id");
    /*
      this.dataObservable = Observable.create(observer => {
        this.service.withSelections(id).subscribe(data => {
          this.notification = Object.assign({}, data);
          this.notification.iconTitle = this.findFirstLatter(this.notification.template.mode);
          this.notification.iconColor = this.findColor(this.notification.template.mode);
          this.comMode = this.notification.selections.receiverType;
          observer.next(data);
          observer.complete();
        });
      });
      */
    this.service.withSelections(id).subscribe(data => {
      this.notification = Object.assign({}, data);
      this.notification.iconTitle = this.findFirstLatter(this.notification.template.mode);
      this.notification.iconColor = this.findColor(this.notification.template.mode);
      this.comMode = this.notification.selections.receiverType;
      this.initFile(this.notification.resources);
    });
  }


  initFile(resources: any) {

    if (resources) {
      for (let key of Object.keys(resources)) {
        this.attachedFiles.push(key);
      }
    }
  }

  onViewFile(id: number) {
    this.navControl.push("FileViewComponent", { id: id });
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
