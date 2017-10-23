import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewAllNotificationComponent} from '../viewAll/viewAllNotification';
import {NotificationService} from '../../../providers/service/notification/notification.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAllNotificationComponent),
    ],
    exports: [ViewAllNotificationComponent ],
    declarations: [ViewAllNotificationComponent],
    providers: [NotificationService],
})
export class ViewAllNotificationModule { }
