import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LeaveComponent} from '../apply/leave';


@NgModule({
    imports: [
        IonicPageModule.forChild(LeaveComponent),
    ],
    exports: [LeaveComponent ],
    declarations: [LeaveComponent],
    providers: [],
})
export class LeaveModule { }
