import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GuardianDashboardComponent} from '../guardian/guardiandashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';
import {StudentLeaveService} from '../../../providers/service/leave/student.leave.service';
import {NgxEchartsModule} from 'ngx-echarts';
@NgModule({
    imports: [
        IonicPageModule.forChild(GuardianDashboardComponent),
        NgxEchartsModule
    ],
    exports: [GuardianDashboardComponent ],
    declarations: [GuardianDashboardComponent],
    providers: [ProfileService,ApprovelService,StudentLeaveService],
})
export class GuardianDashboardModule { }