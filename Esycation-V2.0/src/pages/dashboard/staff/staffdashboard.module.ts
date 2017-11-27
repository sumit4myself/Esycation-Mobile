import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StaffdashboardComponent} from '../staff/staffdashboard';

@NgModule({
    imports: [
        IonicPageModule.forChild(StaffdashboardComponent),
    ],
    exports: [StaffdashboardComponent ],
    declarations: [StaffdashboardComponent],
    providers: [],
})
export class StaffdashboardModule { }
