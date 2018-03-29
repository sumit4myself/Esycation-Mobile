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
import {FileUploadModule} from '../../../file/upload/file.upload.module';
import {FileService} from '../../../../providers/service/file/file.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(EditBulkNotificationComponent),
        PushCounterModule,FileUploadModule
    ],
    exports: [EditBulkNotificationComponent],
    declarations: [EditBulkNotificationComponent],
    providers: [BulkNotificationService, BatchService, CourceService,
        StudentService, DepartmentService, StaffService,FileService],
})
export class EditBulkNotificationModule { }
