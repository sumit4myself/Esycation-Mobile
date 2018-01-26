import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageNotificationComponent } from '../manageNotification/manageNotification';
import { NotificationService } from '../../../../providers/service/notification/notification.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ManageNotificationComponent),
    ],
    exports: [ManageNotificationComponent],
    declarations: [ManageNotificationComponent],
    providers: [NotificationService],
})
export class ViewAllNotificationModule { }
