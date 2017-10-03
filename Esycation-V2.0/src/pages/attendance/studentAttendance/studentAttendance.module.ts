import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StudentAttendanceComponent} from '../studentAttendance/studentAttendance';


@NgModule({
    imports: [
        IonicPageModule.forChild(StudentAttendanceComponent),
    ],
    exports: [StudentAttendanceComponent ],
    declarations: [StudentAttendanceComponent],
    providers: [],
})
export class AttendanceModule { }
