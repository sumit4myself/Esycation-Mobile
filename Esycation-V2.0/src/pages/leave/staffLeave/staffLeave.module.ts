import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StaffLeaveComponent} from '../staffLeave/staffLeave'
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffLeaveComponent),
        
        PushCounterModule
    ],
    exports: [StaffLeaveComponent ],
    declarations: [StaffLeaveComponent],
    providers: [LeaveService],
})
export class StaffLeaveModule { }
