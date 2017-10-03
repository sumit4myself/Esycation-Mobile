import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewNotificationComponent} from '../view/viewNotification';


@NgModule({
    imports: [
        IonicPageModule.forChild(ViewNotificationComponent),
    ],
    exports: [ViewNotificationComponent ],
    declarations: [ViewNotificationComponent],
    providers: [],
})
export class ViewNotificationModule { }
