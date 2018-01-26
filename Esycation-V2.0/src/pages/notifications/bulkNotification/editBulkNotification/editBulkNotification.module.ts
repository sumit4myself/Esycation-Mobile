import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBulkNotificationComponent } from '../editBulkNotification/editBulkNotification';
import { BulkNotificationService } from '../../../../providers/service/notification/bulk.notification.service';
import { BatchService } from '../../../../providers/service/batch/batch.service';
import { CourceService } from '../../../../providers/service/cource/cource.service';
import { StudentService } from '../../../../providers/service/student/student.service';
import { DepartmentService } from '../../../../providers/service/department/department.service';
import { StaffService } from '../../../../providers/service/staff/staff.service';
import { PushCounterModule } from '../../pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(EditBulkNotificationComponent),

        PushCounterModule
    ],
    exports: [EditBulkNotificationComponent],
    declarations: [EditBulkNotificationComponent],
    providers: [BulkNotificationService, BatchService, CourceService,
        StudentService, DepartmentService, StaffService],
})
export class EditBulkNotificationModule { }
