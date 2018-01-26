
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveStudentLeaveComponent } from '../approveStudentLeave/approveStudentLeave';
import { StudentLeaveService } from '../../../providers/service/leave/student.leave.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";

@NgModule({
    imports: [
        IonicPageModule.forChild(ApproveStudentLeaveComponent),
        PushCounterModule
    ],
    exports: [ApproveStudentLeaveComponent],
    declarations: [ApproveStudentLeaveComponent],
    providers: [StudentLeaveService, ApprovalService],
})
export class ApproveStudentLeaveModule { }
