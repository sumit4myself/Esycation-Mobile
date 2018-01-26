<<<<<<< HEAD
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
=======
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GuardianDashboardComponent } from "../guardian/guardiandashboard";
import { ProfileService } from "../../../providers/service/profile/profile.service";
import { ApprovalService } from "../../../providers/service/approvel/approvel.service";
import { LeaveService } from "../../../providers/service/leave/leave.service";
import { NgxEchartsModule } from "ngx-echarts";
@NgModule({
  imports: [
    IonicPageModule.forChild(GuardianDashboardComponent),
    NgxEchartsModule
  ],
  exports: [GuardianDashboardComponent],
  declarations: [GuardianDashboardComponent],
  providers: [ProfileService, ApprovalService, LeaveService]
>>>>>>> 9c2d2572864381fe086f576ba00d49271e1a8c7a
})
export class GuardianDashboardModule {}
