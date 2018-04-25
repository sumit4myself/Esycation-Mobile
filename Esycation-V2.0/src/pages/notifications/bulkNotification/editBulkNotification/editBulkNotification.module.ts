import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EditBulkNotificationComponent } from "../editBulkNotification/editBulkNotification";
import { BulkNotificationService } from "../../../../providers/service/notification/bulk.notification.service";
import { BatchService } from "../../../../providers/service/schools/batch/batch.service";
import { CourseService } from "../../../../providers/service/schools/course/course.service";
import { StudentService } from "../../../../providers/service/students/student/student.service";
import { DepartmentService } from "../../../../providers/service/staffs/department/department.service";
import { StaffService } from "../../../../providers/service/staffs/staff/staff.service";
import { PushCounterModule } from "../../pushcounter/pushcounter.module";
import { FileUploadModule } from "../../../file/upload/file.upload.module";
import { FileService } from "../../../../providers/service/file/file.service";

@NgModule({
  imports: [
    IonicPageModule.forChild(EditBulkNotificationComponent),
    PushCounterModule,
    FileUploadModule
  ],
  exports: [EditBulkNotificationComponent],
  declarations: [EditBulkNotificationComponent],
  providers: [
    BulkNotificationService,
    BatchService,
    CourseService,
    StudentService,
    DepartmentService,
    StaffService,
    FileService
  ]
})
export class EditBulkNotificationModule {}
