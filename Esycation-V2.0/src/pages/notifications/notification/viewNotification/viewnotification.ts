import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";
import { NotificationService } from "../../../../providers/service/notification/notification.service";
import { NotificationDetails } from "../../../../providers/model/notification/notification.model";
import { FileDetails } from "../../../../providers/model/file/model.file";
import { CommonServices } from "../../../../providers/service/common/common.service";
import { NotificationUtils } from "../../../../providers/utilits/notificationUtils";
import { ServerConfig } from "../../../../providers/config";

@IonicPage()
@Component({
  selector: "view-notifications",
  templateUrl: "viewnotification.html"
})
export class ViewNotificationComponent {
  notification: NotificationDetails = new NotificationDetails();
  isLoaded: boolean = false;
  notificationCount: any = 0;
  files: Array<FileDetails> = null;
  imagePath: String = ServerConfig.browseFilePath();
  constructor(
    private notificationService: NotificationService,
    private navParams: NavParams,
    private commonServices: CommonServices
  ) {}

  ionViewDidLoad() {
    this.commonServices.onLoader();
    let id = this.navParams.get("id");
    this.notificationService.findById(id).subscribe(
      data => {
        let b = Object.assign({}, data);
        this.notification = b;
        this.notification.notificationId.styleColor = NotificationUtils.findColor(
          this.notification.notificationId.type
        );
        this.notification.notificationId.typeInfo = NotificationUtils.findFirstLatter(
          this.notification.notificationId.type
        );
        this.isLoaded = true;

        if (this.notification.notificationId.resources)
          this.prepareFiles(this.notification.notificationId.resources);

        this.commonServices.onDismissAll();
      },
      error => {
        this.commonServices.onDismissAll();
        console.log(error);
      }
    );
  }

  prepareFiles(map: any) {
    this.files = new Array<FileDetails>();
    for (let key of Object.keys(this.notification.notificationId.resources)) {
      let file = new FileDetails();
      file.id = key;
      file.name = map[key];
      file.extenstion = map[key].slice(
        ((map[key].lastIndexOf(".") - 1) >>> 0) + 2
      );
      this.files.push(file);
    }
  }
}
