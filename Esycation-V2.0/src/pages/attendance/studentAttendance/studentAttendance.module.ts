import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StudentAttendanceComponent} from '../studentAttendance/studentAttendance';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(StudentAttendanceComponent),
    ],
    exports: [StudentAttendanceComponent ],
    declarations: [StudentAttendanceComponent],
    providers: [AttendanceService],
})
export class StudentAttendanceModule { }
