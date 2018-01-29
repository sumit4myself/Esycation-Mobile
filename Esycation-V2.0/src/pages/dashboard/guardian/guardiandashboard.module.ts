import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GuardianDashboardComponent } from "../guardian/guardiandashboard";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { StudentService } from "../../../providers/service/student/student.service";
import { StaffService } from "../../../providers/service/staff/staff.service";
import { AttendanceService } from "../../../providers/service/attendance/attendance.service";
import { NgxEchartsModule } from "ngx-echarts";
import { LoaderModule } from "../../../components/loader/loader.module";
import { NgCalendarModule } from 'ionic2-calendar';
@NgModule({
  imports: [
    IonicPageModule.forChild(GuardianDashboardComponent),
    NgxEchartsModule, NgCalendarModule, LoaderModule
  ],
  exports: [GuardianDashboardComponent],
  declarations: [GuardianDashboardComponent],
  providers: [StaffService, ApprovalService, StudentService, AttendanceService]
})
export class GuardianDashboardModule { }
