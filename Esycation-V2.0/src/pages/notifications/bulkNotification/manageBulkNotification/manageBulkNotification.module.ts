import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ManageBulkNotificationComponent } from "../manageBulkNotification/manageBulkNotification";
import { BulkNotificationService } from "../../../../providers/service/notification/bulk.notification.service";
import { PushCounterModule } from "../../pushcounter/pushcounter.module";
@NgModule({
  imports: [
    IonicPageModule.forChild(ManageBulkNotificationComponent),
    PushCounterModule
  ],
  exports: [ManageBulkNotificationComponent],
  declarations: [ManageBulkNotificationComponent],
  providers: [BulkNotificationService]
})
export class ManageBulkNotificationModule {}
