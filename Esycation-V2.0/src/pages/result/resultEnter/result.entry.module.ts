import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryComponent} from '../resultEnter/result.entry';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryComponent),
    ],
    exports: [ResultEntiryComponent ],
    declarations: [ResultEntiryComponent],
    providers: [ResultEntryService],
})
export class ResultEntryModule { }
