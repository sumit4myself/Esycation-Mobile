import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewNotificationComponent} from '../viewNotification/viewnotification';
import {NotificationService} from '../../../providers/service/notification/notification.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewNotificationComponent),
    ],
    exports: [ViewNotificationComponent ],
    declarations: [ViewNotificationComponent],
    providers: [NotificationService],
})
export class ViewNotificationModule { }
