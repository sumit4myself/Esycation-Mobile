import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryComponent} from '../resultEnter/result.entry';
import {AttendanceService} from '../../../providers/service/attendance/attendance.service';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';
@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryComponent),
    ],
    exports: [ResultEntiryComponent ],
    declarations: [ResultEntiryComponent],
    providers: [AttendanceService,ResultEntryService],
})
export class ResultEntryModule { }
