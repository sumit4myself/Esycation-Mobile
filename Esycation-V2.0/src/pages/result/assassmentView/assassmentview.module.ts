import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AssassmentViewComponent} from '../assassmentView/assassmentview';


@NgModule({
    imports: [
        IonicPageModule.forChild(AssassmentViewComponent),
    ],
    exports: [AssassmentViewComponent ],
    declarations: [AssassmentViewComponent],
    providers: [],
})
export class AssassmentViewModule { }
