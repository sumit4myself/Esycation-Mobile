import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StaffLeaveComponent} from '../staffLeave/staffLeave'
import {LeaveService} from '../../../providers/service/leave/leave.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffLeaveComponent),
    ],
    exports: [StaffLeaveComponent ],
    declarations: [StaffLeaveComponent],
    providers: [LeaveService],
})
export class StaffLeaveModule { }
