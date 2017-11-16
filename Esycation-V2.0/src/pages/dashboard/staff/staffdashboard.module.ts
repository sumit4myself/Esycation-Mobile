import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {StudentdashboardComponent} from '../student/studentdashboard';

@NgModule({
    imports: [
        IonicPageModule.forChild(StudentdashboardComponent),
    ],
    exports: [StudentdashboardComponent ],
    declarations: [StudentdashboardComponent],
    providers: [],
})
export class StaffdashboardModule { }
