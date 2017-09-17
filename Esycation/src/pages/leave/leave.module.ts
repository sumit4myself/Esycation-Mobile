import { NgModule } from '@angular/core'; 
import { IonicModule } from 'ionic-angular';
import {LeaveComponent} from '../leave/apply/leave.component';
import {LeaveApproveComponent} from '../leave/approve/leave-approve.component';


@NgModule({
    imports:[IonicModule],
    entryComponents:[
        LeaveComponent,LeaveApproveComponent],
    declarations:[LeaveComponent,LeaveApproveComponent],
    providers:[],
}) export class LeaveModule{}