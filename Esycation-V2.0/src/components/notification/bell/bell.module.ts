import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { NotificationBellComponent } from "../bell/bell.component";
import { NotificationService } from "../../../providers/service/notification/notification.service";

@NgModule({
  imports: [IonicPageModule.forChild(NotificationBellComponent)],
  exports: [NotificationBellComponent],
  declarations: [NotificationBellComponent],
  providers: [NotificationService]
})
export class NotificationBellModule {}
