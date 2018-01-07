import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StaffDashboardComponent} from '../staff/staffdashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffDashboardComponent),
    ],
    exports: [StaffDashboardComponent ],
    declarations: [StaffDashboardComponent],
    providers: [ProfileService,BulkNotificationService],
})
export class StaffDashboardModule { }
