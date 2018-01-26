import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultEntiryViewComponent } from '../resultEntryView/result.entry.view';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryViewComponent),
        PushCounterModule
    ],
    exports: [ResultEntiryViewComponent],
    declarations: [ResultEntiryViewComponent],
    providers: [ResultEntryService],
})
export class ResultEntryViewModule { }
