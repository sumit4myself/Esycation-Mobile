import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryComponent} from '../resultEnter/result.entry';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';
import {PushCounterModule} from '../../notification/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryComponent),
        PushCounterModule
    ],
    exports: [ResultEntiryComponent ],
    declarations: [ResultEntiryComponent],
    providers: [ResultEntryService],
})
export class ResultEntryModule { }
