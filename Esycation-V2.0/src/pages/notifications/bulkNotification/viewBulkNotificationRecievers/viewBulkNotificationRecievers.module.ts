import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBulkNotificationsRecieverComponent } from '../viewBulkNotificationRecievers/viewBulkNotificationRecievers';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';
import { BatchService } from '../../../../providers/service/batch/batch.service';
import { CourceService } from '../../../../providers/service/cource/cource.service';
import { StudentService } from '../../../../providers/service/student/student.service';
import { DepartmentService } from '../../../../providers/service/department/department.service';
import { StaffService } from '../../../../providers/service/staff/staff.service';
import { PushCounterModule } from '../../pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(ViewBulkNotificationsRecieverComponent),

        PushCounterModule
    ],
    exports: [ViewBulkNotificationsRecieverComponent],
    declarations: [ViewBulkNotificationsRecieverComponent],
    providers: [BulkNotificationService, BatchService, CourceService,
        StudentService, DepartmentService, StaffService],
})
export class ViewBulkNotificationRecieverModule { }
