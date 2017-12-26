import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {DeleteBulkNotificationsComponent} from '../deleteBulkNotification/deleteBulkNotification';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {BatchService} from '../../../providers/service/batch/batch.service';
import {CourceService} from '../../../providers/service/cource/cource.service'; 
import {StudentService} from '../../../providers/service/student/student.service'; 
import {DepartmentService} from '../../../providers/service/department/department.service';
import {StaffService} from '../../../providers/service/staff/staff.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(DeleteBulkNotificationsComponent),
    ],
    exports: [DeleteBulkNotificationsComponent ],
    declarations: [DeleteBulkNotificationsComponent],
    providers: [BulkNotificationService,BatchService,CourceService,
        StudentService,DepartmentService,StaffService],
})
export class DeleteBulkNotificationModule { }
