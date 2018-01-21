import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewAllBulkNotificationComponent} from '../viewAllBulkNotification/viewAllBulkNotification';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAllBulkNotificationComponent),
        PushCounterModule
    ],
    exports: [ViewAllBulkNotificationComponent ],
    declarations: [ViewAllBulkNotificationComponent],
    providers: [BulkNotificationService],
})
export class ViewAllBulkNotificationModule { }
