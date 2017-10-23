import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LeaveComponent} from '../apply/leave';
import {LeaveService} from '../../../providers/service/leave/leave.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(LeaveComponent),
    ],
    exports: [LeaveComponent ],
    declarations: [LeaveComponent],
    providers: [LeaveService],
})
export class LeaveModule { }
