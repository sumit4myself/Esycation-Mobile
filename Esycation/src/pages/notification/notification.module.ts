import { NgModule } from '@angular/core'; 
import { IonicModule } from 'ionic-angular';
import {ViewNotificationComponent} from '../notification/view/view-notification.component';
import {ViewAllNotificationComponent} from '../notification/view-all/view-all-notification.component';
import { Push } from '@ionic-native/push';
@NgModule({
    imports:[IonicModule],
    entryComponents:[
            ViewNotificationComponent,
            ViewAllNotificationComponent
        ],
    declarations:[ViewNotificationComponent,
        ViewAllNotificationComponent
    ],
    providers:[Push],
}) export class NotificationModule{}