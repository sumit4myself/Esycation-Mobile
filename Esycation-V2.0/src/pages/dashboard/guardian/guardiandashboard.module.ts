import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GuardianDashboardComponent } from "../guardian/guardiandashboard";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { StudentService } from "../../../providers/service/students/student/student.service";
import { StaffService } from "../../../providers/service/staffs/staff/staff.service";
import { AttendanceService } from "../../../providers/service/attendance/attendance.service";
import { BatchService } from "../../../providers/service/schools/batch/batch.service";
import { NgxEchartsModule } from "ngx-echarts";
import { LoaderModule } from "../../../components/loader/loader.module";
import { NgCalendarModule } from "ionic2-calendar";
import { PushCounterModule } from "../../notifications/pushcounter/pushcounter.module";
import { TimetableService } from "../../../providers/service/schools/timetable/timetable.service";
@NgModule({
  imports: [
    IonicPageModule.forChild(GuardianDashboardComponent),
    PushCounterModule,
    NgxEchartsModule,
    NgCalendarModule,
    LoaderModule
  ],
  exports: [GuardianDashboardComponent],
  declarations: [GuardianDashboardComponent],
  providers: [
    StaffService,
    ApprovalService,
    StudentService,
    AttendanceService,
    BatchService,
    TimetableService
  ]
})
export class GuardianDashboardModule {}
