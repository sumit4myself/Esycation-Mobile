import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ViewBulkNotificationsRecieverComponent } from "../viewBulkNotificationRecievers/viewBulkNotificationRecievers";
import { BulkNotificationService } from "../../../../providers/service/notification/bulk.notification.service";
import { BatchService } from "../../../../providers/service/schools/batch/batch.service";
import { CourseService } from "../../../../providers/service/schools/course/course.service";
import { StudentService } from "../../../../providers/service/students/student/student.service";
import { DepartmentService } from "../../../../providers/service/staffs/department/department.service";
import { StaffService } from "../../../../providers/service/staffs/staff/staff.service";
import { PushCounterModule } from "../../pushcounter/pushcounter.module";
@NgModule({
  imports: [
    IonicPageModule.forChild(ViewBulkNotificationsRecieverComponent),
    PushCounterModule
  ],
  exports: [ViewBulkNotificationsRecieverComponent],
  declarations: [ViewBulkNotificationsRecieverComponent],
  providers: [
    BulkNotificationService,
    BatchService,
    CourseService,
    StudentService,
    DepartmentService,
    StaffService
  ]
})
export class ViewBulkNotificationRecieverModule {}
