import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewBulkNotificationsComponent} from '../viewBulkNotification/viewBulkNotification';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {BatchService} from '../../../providers/service/batch/batch.service';
import {CourceService} from '../../../providers/service/cource/cource.service'; 
import {StudentService} from '../../../providers/service/student/student.service'; 
import {DepartmentService} from '../../../providers/service/department/department.service';
import {StaffService} from '../../../providers/service/staff/staff.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(ViewBulkNotificationsComponent),
        
        PushCounterModule
    ],
    exports: [ViewBulkNotificationsComponent ],
    declarations: [ViewBulkNotificationsComponent],
    providers: [BulkNotificationService,BatchService,CourceService,
        StudentService,DepartmentService,StaffService],
})
export class ViewBulkNotificationModule { }
