import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ViewAssessmentComponent } from '../viewAssessment/viewAssessment';
import { AssessmentService } from '../../../providers/service/assessment/assessment.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAssessmentComponent),
        Ionic2RatingModule, PushCounterModule
    ],
    exports: [ViewAssessmentComponent],
    declarations: [ViewAssessmentComponent],
    providers: [AssessmentService],
})
export class ViewAssessmentModule { }
