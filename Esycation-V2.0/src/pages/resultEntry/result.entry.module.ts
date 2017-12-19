import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ResultEntiryComponent} from '../resultEntry/result.entry';


@NgModule({
    imports: [
        IonicPageModule.forChild(ResultEntiryComponent),
    ],
    exports: [ResultEntiryComponent ],
    declarations: [ResultEntiryComponent],
    providers: [],
})
export class LeaveModule { }
