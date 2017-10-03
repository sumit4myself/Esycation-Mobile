import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ViewAllNotificationComponent} from '../viewAll/viewAllNotification';


@NgModule({
    imports: [
        IonicPageModule.forChild(ViewAllNotificationComponent),
    ],
    exports: [ViewAllNotificationComponent ],
    declarations: [ViewAllNotificationComponent],
    providers: [],
})
export class ViewAllNotificationModule { }
