import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewResultComponent} from '../viewResult/viewResult';
import {ResultEntryService} from '../../../providers/service/resultEntry/result.entry.service';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewResultComponent),
    ],
    exports: [ViewResultComponent ],
    declarations: [ViewResultComponent],
    providers: [ResultEntryService],
})
export class ViewResultModule { }
