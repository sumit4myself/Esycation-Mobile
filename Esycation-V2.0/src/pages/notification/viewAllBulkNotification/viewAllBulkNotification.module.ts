import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewAllBulkNotificationComponent} from '../viewAllBulkNotification/viewAllBulkNotification';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAllBulkNotificationComponent),
    ],
    exports: [ViewAllBulkNotificationComponent ],
    declarations: [ViewAllBulkNotificationComponent],
    providers: [BulkNotificationService],
})
export class ViewAllBulkNotificationModule { }
