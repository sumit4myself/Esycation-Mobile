import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LeaveComponent} from '../apply/leave';
import {LeaveService} from '../../../providers/service/leave/leave.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(LeaveComponent),
        
        PushCounterModule
    ],
    exports: [LeaveComponent ],
    declarations: [LeaveComponent],
    providers: [LeaveService],
})
export class LeaveModule { }
