import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentLeaveComponent } from '../studentLeave/studentLeave';
import { StudentLeaveService } from '../../../providers/service/leave/student.leave.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(StudentLeaveComponent),

        PushCounterModule
    ],
    exports: [StudentLeaveComponent],
    declarations: [StudentLeaveComponent],
    providers: [StudentLeaveService],
})
export class StudentLeaveModule { }
