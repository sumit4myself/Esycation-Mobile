import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ApproveStudentLeaveComponent} from '../approveStudentLeave/approveStudentLeave';
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service'; 

@NgModule({
    imports: [
        IonicPageModule.forChild(ApproveStudentLeaveComponent),
    ],
    exports: [ApproveStudentLeaveComponent ],
    declarations: [ApproveStudentLeaveComponent],
    providers: [LeaveService,ApprovelService],
})
export class ApproveStudentLeaveModule { }
