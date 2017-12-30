import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryViewComponent} from '../resultEntryView/result.entry.view';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryViewComponent),
    ],
    exports: [ResultEntiryViewComponent ],
    declarations: [ResultEntiryViewComponent],
    providers: [ResultEntryService],
})
export class ResultEntryViewModule { }
