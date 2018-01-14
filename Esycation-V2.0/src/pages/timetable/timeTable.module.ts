import { TimeTableComponent } from './timeTable';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    imports: [
        IonicPageModule.forChild(TimeTableComponent),
    ],
    exports: [ TimeTableComponent],
    declarations: [TimeTableComponent],
    providers: [],
})
export class TimeTableModule { }
