import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewNotificationComponent } from '../viewNotification/viewnotification';
import { NotificationService } from '../../../../providers/service/notification/notification.service';
import {FileDownlaodModule} from '../../../file/download/file.download.module';


@NgModule({
    imports: [
        IonicPageModule.forChild(ViewNotificationComponent),
        FileDownlaodModule
    ],
    exports: [ViewNotificationComponent],
    declarations: [ViewNotificationComponent],
    providers: [NotificationService],
})
export class ViewNotificationModule { }
