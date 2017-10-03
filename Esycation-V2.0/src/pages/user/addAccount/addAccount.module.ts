import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AddAccountComponent} from '../addAccount/addAccount';


@NgModule({
    imports: [
        IonicPageModule.forChild(AddAccountComponent),
    ],
    exports: [AddAccountComponent ],
    declarations: [AddAccountComponent],
    providers: [],
})
export class AddAccountModule { }
