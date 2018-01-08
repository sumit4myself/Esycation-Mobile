import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StudentDashboardComponent} from '../student/studentdashboard';
import {ProfileService} from '../../../providers/service/profile/profile.service';
import {ApprovelService} from '../../../providers/service/approvel/approvel.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(StudentDashboardComponent),
    ],
    exports: [StudentDashboardComponent ],
    declarations: [StudentDashboardComponent],
    providers: [ProfileService,ApprovelService],
})
export class StudentDashboardModule { }
