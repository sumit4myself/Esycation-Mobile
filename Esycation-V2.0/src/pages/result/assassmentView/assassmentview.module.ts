import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AssassmentViewComponent} from '../assassmentView/assassmentview';
import {AssessmentService} from '../../../providers/service/assessment/assessment.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(AssassmentViewComponent),
    ],
    exports: [AssassmentViewComponent ],
    declarations: [AssassmentViewComponent],
    providers: [AssessmentService],
})
export class AssassmentViewModule { }
