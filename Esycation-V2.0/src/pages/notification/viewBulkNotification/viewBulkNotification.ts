import { Component } from '@angular/core';
import { IonicPage,NavController} from 'ionic-angular';
import {UserSessionService} from '../../../providers/service/core/user.session.service';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {BaseComponent} from '../../baseComponent/base.component';

@IonicPage()
@Component({
  selector: 'view-bulk-notification-p',
  templateUrl: 'viewBulkNotification.html'
})
export class ViewBulkNotificationsComponent extends BaseComponent {
    
   
    viewMode: string;
     constructor(private session:UserSessionService,
                 
                 private bulkNotificationService:BulkNotificationService,
                 protected navControl:NavController ) {

            super(session,navControl)
            this.viewMode="first";
            console.log(this.session,this.bulkNotificationService);        
    }


}
