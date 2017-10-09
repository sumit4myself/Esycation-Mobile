import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ManageAttendanceComponent} from '../manageAttendance/manageStudentAttendance';


@NgModule({
    imports: [
        IonicPageModule.forChild(ManageAttendanceComponent),
    ],
    exports: [ManageAttendanceComponent ],
    declarations: [ManageAttendanceComponent],
    providers: [],
})
export class ManageAttendanceModule { }
