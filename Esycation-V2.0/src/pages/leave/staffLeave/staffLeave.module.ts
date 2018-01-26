import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffLeaveComponent } from '../staffLeave/staffLeave'
import { StaffLeaveService } from '../../../providers/service/leave/staff.leave.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffLeaveComponent),

        PushCounterModule
    ],
    exports: [StaffLeaveComponent],
    declarations: [StaffLeaveComponent],
    providers: [StaffLeaveService],
})
export class StaffLeaveModule { }
