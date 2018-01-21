import { Component } from '@angular/core';
import { IonicPage, NavParams} from 'ionic-angular';
import {BulkNotificationService} from '../../../providers/service/notification/bulk.notification.service';
import {NotificationDetails} from '../../../providers/model/notification/notification.model';
import {CommonServices} from '../../../providers/service/common/common.service';

@IonicPage()
@Component({
  selector: 'view-bulk-message',
  templateUrl: 'viewBulkMessage.html'
})
export class ViewBulkMessageComponent {

     notification:NotificationDetails=new NotificationDetails();
     isLoaded:boolean=false;
     
     constructor(private service:BulkNotificationService,
         private navParams:NavParams,
         private commonServices:CommonServices) {

          console.log(this.service,this.navParams,this.commonServices);
      }


      ionViewDidLoad(){
       
      }

}
