import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AssassmentViewComponent} from '../assassmentView/assassmentview';
import {AssessmentService} from '../../../providers/service/assessment/assessment.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(AssassmentViewComponent),
        PushCounterModule
    ],
    exports: [AssassmentViewComponent ],
    declarations: [AssassmentViewComponent],
    providers: [AssessmentService],
})
export class AssassmentViewModule { }
