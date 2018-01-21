import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ApproveStudentLeaveComponent} from '../approveStudentLeave/approveStudentLeave';
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service'; 
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(ApproveStudentLeaveComponent),
        
        PushCounterModule
    ],
    exports: [ApproveStudentLeaveComponent ],
    declarations: [ApproveStudentLeaveComponent],
    providers: [LeaveService,ApprovelService],
})
export class ApproveStudentLeaveModule { }
