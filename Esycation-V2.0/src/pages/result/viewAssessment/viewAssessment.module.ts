import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ViewAssessmentComponent } from '../viewAssessment/viewAssessment';
import { AssessmentService } from '../../../providers/service/assessment/assessment.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAssessmentComponent),
        Ionic2RatingModule
    ],
    exports: [ViewAssessmentComponent],
    declarations: [ViewAssessmentComponent],
    providers: [AssessmentService],
})
export class ViewAssessmentModule { }
