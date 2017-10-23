import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LogoutComponent} from '../logout/logout';
@NgModule({
    imports: [
        IonicPageModule.forChild(LogoutComponent),
    ],
    exports: [LogoutComponent ],
    declarations: [LogoutComponent],
    providers: [],
})
export class LogoutModule { }
