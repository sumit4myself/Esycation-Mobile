import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GuardianDashboardComponent} from '../guardian/guardiandashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(GuardianDashboardComponent),
    ],
    exports: [GuardianDashboardComponent ],
    declarations: [GuardianDashboardComponent],
    providers: [ProfileService,ApprovelService],
})
export class GuardianDashboardModule { }
