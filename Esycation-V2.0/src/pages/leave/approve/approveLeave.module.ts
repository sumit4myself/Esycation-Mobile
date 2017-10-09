import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LeaveApproveComponent} from '../approve/approveLeave';


@NgModule({
    imports: [
        IonicPageModule.forChild(LeaveApproveComponent),
    ],
    exports: [LeaveApproveComponent ],
    declarations: [LeaveApproveComponent],
    providers: [],
})
export class LeaveApproveModule { }
