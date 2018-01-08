import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StaffDashboardComponent} from '../staff/staffdashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';;
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffDashboardComponent),
    ],
    exports: [StaffDashboardComponent ],
    declarations: [StaffDashboardComponent],
    providers: [ProfileService,ApprovelService],
})
export class StaffDashboardModule { }
