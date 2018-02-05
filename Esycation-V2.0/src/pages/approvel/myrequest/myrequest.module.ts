
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRequestComponent } from '../myrequest/myrequest';
import { StudentLeaveService } from '../../../providers/service/leave/student.leave.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";

@NgModule({
    imports: [
        IonicPageModule.forChild(MyRequestComponent),
        PushCounterModule
    ],
    exports: [MyRequestComponent],
    declarations: [MyRequestComponent],
    providers: [StudentLeaveService, ApprovalService],
})
export class MyRequestModule { }
