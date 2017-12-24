import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GuardianDashboardComponent} from '../guardian/guardiandashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(GuardianDashboardComponent),
    ],
    exports: [GuardianDashboardComponent ],
    declarations: [GuardianDashboardComponent],
    providers: [ProfileService],
})
export class GuardianDashboardModule { }
