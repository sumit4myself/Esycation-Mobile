import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewStudentComponent } from '../viewStudent/viewStudent';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';
import { CourceService } from '../../../providers/service/cource/cource.service';
import { BatchService } from '../../../providers/service/batch/batch.service';
import { StudentService } from '../../../providers/service/student/student.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(ViewStudentComponent),
        PushCounterModule
    ],
    exports: [ViewStudentComponent],
    declarations: [ViewStudentComponent],
    providers: [CourceService, BatchService,StudentService],
})
export class ViewStudentModule { }
