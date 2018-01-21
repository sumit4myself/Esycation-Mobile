import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import {AssassmentComponent} from '../assassment/assassment';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';
import {AssessmentService} from '../../../providers/service/assessment/assessment.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';
@NgModule({
    imports: [
        IonicPageModule.forChild(AssassmentComponent),
        Ionic2RatingModule,PushCounterModule
    ],
    exports: [AssassmentComponent ],
    declarations: [AssassmentComponent],
    providers: [AttendanceService,AssessmentService],
})
export class AssassmentModule { }
