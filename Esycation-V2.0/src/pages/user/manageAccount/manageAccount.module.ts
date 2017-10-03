import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ManageAccountComponent} from '../manageAccount/manageAccount';


@NgModule({
    imports: [
        IonicPageModule.forChild(ManageAccountComponent),
    ],
    exports: [ManageAccountComponent ],
    declarations: [ManageAccountComponent],
    providers: [],
})
export class HomeModule { }
