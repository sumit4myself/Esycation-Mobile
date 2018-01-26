import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageAttendanceComponent } from '../manageAttendance/manageStudentAttendance';
import { AttendanceService } from '../../../providers/service/attendance/attendance.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(ManageAttendanceComponent),
        PushCounterModule
    ],
    exports: [ManageAttendanceComponent],
    declarations: [ManageAttendanceComponent],
    providers: [AttendanceService],
})
export class ManageAttendanceModule { }
