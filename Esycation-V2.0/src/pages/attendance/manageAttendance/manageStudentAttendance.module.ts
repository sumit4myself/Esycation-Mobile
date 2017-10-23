import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ManageAttendanceComponent} from '../manageAttendance/manageStudentAttendance';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ManageAttendanceComponent),
    ],
    exports: [ManageAttendanceComponent ],
    declarations: [ManageAttendanceComponent],
    providers: [AttendanceService],
})
export class ManageAttendanceModule { }
