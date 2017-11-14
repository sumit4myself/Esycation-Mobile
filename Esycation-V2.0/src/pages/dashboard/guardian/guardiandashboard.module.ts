import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GuardiandashboardComponent} from '../guardian/guardiandashboard';

@NgModule({
    imports: [
        IonicPageModule.forChild(GuardiandashboardComponent),
    ],
    exports: [GuardiandashboardComponent ],
    declarations: [GuardiandashboardComponent],
    providers: [],
})
export class GuardiandashboardModule { }
