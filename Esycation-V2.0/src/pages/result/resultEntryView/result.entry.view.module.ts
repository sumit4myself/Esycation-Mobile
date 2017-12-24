import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryViewComponent} from '../resultEntryView/result.entry.view';


@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryViewComponent),
    ],
    exports: [ResultEntiryViewComponent ],
    declarations: [ResultEntiryViewComponent],
    providers: [],
})
export class ResultEntryViewModule { }
