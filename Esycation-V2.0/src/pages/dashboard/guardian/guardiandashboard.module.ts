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
})
export class GuardianDashboardModule {}
