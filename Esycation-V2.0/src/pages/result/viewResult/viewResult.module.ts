import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewResultComponent } from '../viewResult/viewResult';
import { ResultEntryService } from '../../../providers/service/resultEntry/result.entry.service';
import { PushCounterModule } from '../../notifications/pushcounter/pushcounter.module';

@NgModule({
    imports: [
        IonicPageModule.forChild(ViewResultComponent),

        PushCounterModule
    ],
    exports: [ViewResultComponent],
    declarations: [ViewResultComponent],
    providers: [ResultEntryService],
})
export class ViewResultModule { }
