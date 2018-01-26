import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {NotificationService} from '../../../providers/service/notification/notification.service';
import {PushCounterComponent} from '../pushcounter/pushcounter';
@NgModule({
    imports: [
        IonicPageModule.forChild(PushCounterComponent),
    ],
    exports: [PushCounterComponent ],
    declarations: [PushCounterComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [NotificationService],
})
export class PushCounterModule { }