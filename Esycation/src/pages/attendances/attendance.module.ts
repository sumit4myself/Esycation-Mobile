import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AttendanceComponent } from '../attendances/attendance/attendance.componet';
import {ManageAttendanceComponent} from '../attendances/manage-attendance/manage.attendance.componet';
import {AttendanceService} from '../../shared/services/attendance/attendance.service';
@NgModule({
    imports: [
        IonicModule
    ],
    entryComponents: [
        AttendanceComponent,ManageAttendanceComponent],

    declarations: [
        AttendanceComponent,ManageAttendanceComponent],
    providers: [AttendanceService],
})
export class AttendanceModule { }
