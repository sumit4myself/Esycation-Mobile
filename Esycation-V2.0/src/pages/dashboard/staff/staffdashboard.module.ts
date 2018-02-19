import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StaffDashboardComponent } from "../staff/staffdashboard";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { TimetableService } from "../../../providers/service/timetable/timetable.service";
import { NgxEchartsModule } from "ngx-echarts";
import { LoaderModule } from "../../../components/loader/loader.module";
import { AttendanceService } from '../../../providers/service/attendance/attendance.service';
import { NgCalendarModule } from 'ionic2-calendar';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
@NgModule({
  imports: [
    IonicPageModule.forChild(StaffDashboardComponent),
    NgxEchartsModule,
    LoaderModule,NgCalendarModule,PushCounterModule
  ],
  exports: [StaffDashboardComponent],
  declarations: [StaffDashboardComponent],
  providers: [ProfileService, ApprovalService, TimetableService, AttendanceService]
})
export class StaffDashboardModule { }
